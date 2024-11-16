"use client";

import DOMPurify from "dompurify";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import LoadingButton from "@/app/components/loading-button";
import { useEmbeddingWorker } from "@/hooks/use-embedding-worker";
import { mbtiList } from "../../../../../data/mbti-list";
import { useTranslationWorker } from "@/hooks/use-translation-worker";
import { isContainChinese } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const placeholderList = [
  "Gain energy from solitude, prefer facts, value logic, and enjoy structured plans.",
  "Thrive in social settings, imagine possibilities, focus on harmony, and stay open to spontaneity.",
  "Enjoy one-on-one talks, find patterns, balance empathy with logic, and adapt easily to changes.",
];

const placeholderListZhTW = [
  "喜愛安靜時光，重視細節，偏好理性分析，並享受有計劃的安排。",
  "社交活力滿滿，愛幻想未來，重視人際和諧，享受隨機應變的生活。",
  "喜愛深度對話，注重全局，兼顧理性與感性，樂於接受變化。",
];

function getLocalePlaceholder(locale: string) {
  if (locale === "zh-TW") {
    return placeholderListZhTW;
  }
  return placeholderList;
}

export default function Describe() {
  const locale = useLocale();
  const t = useTranslations("Form");
  const [placeholder, setPlaceholder] = useState<string>(
    getLocalePlaceholder(locale)[0]
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentInput, setCurrentInput] = useState<string>("");
  const [tab, setTab] = useState<"quiz" | "result">("quiz");

  const {
    result: translResult,
    sendMessage: sendTranslMessage,
    workerStatus: translStatus,
  } = useTranslationWorker();

  const {
    result: embeddingResult,
    sendMessage: sendEmbeddingMessage,
    workerStatus: embeddingStatus,
  } = useEmbeddingWorker();

  const sortedResult = embeddingResult?.output?.similarResults?.sort(
    (a, b) => b.similarity - a.similarity
  );

  // 監聽翻譯結果
  useEffect(() => {
    if (translStatus === "complete" && translResult && currentInput) {
      const translatedText = translResult.output[0].translation_text;
      const sanitizedInputValue = DOMPurify.sanitize(translatedText);

      sendEmbeddingMessage({
        array: [
          {
            type: null,
            trait: sanitizedInputValue,
          },
          ...mbtiList,
        ],
        pathParam: "trait",
      });
    }
  }, [translStatus, translResult, sendEmbeddingMessage]);

  useEffect(() => {
    if (
      embeddingStatus === "complete" ||
      translStatus === "error" ||
      embeddingStatus === "error"
    ) {
      setIsProcessing(false);
      setCurrentInput("");
      if (embeddingStatus === "complete") {
        setTab("result");
      }
    }
  }, [embeddingStatus, translStatus]);

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const inputValue = (
        e.currentTarget.elements.namedItem("inputField") as HTMLInputElement
      ).value;

      if (!inputValue) {
        throw new Error("Input value is empty");
      }

      setCurrentInput(inputValue);

      if (isContainChinese(inputValue)) {
        sendTranslMessage(inputValue);
      } else {
        const sanitizedInputValue = DOMPurify.sanitize(inputValue);
        sendEmbeddingMessage({
          array: [
            {
              type: null,
              trait: sanitizedInputValue,
            },
            ...mbtiList,
          ],
          pathParam: "trait",
        });
      }
    } catch (error) {
      console.error(error);
      setIsProcessing(false);
    }
  }

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setPlaceholder(getLocalePlaceholder(locale)[index]);
      index = (index + 1) % getLocalePlaceholder(locale).length;
    }, 2000);
    return () => clearInterval(interval);
  }, [locale]);

  const isLoading =
    isProcessing || !["ready", "complete"].includes(embeddingStatus);

  return (
    <Tabs value={tab} className="flex flex-col items-center gap-4">
      <TabsList>
        <TabsTrigger value="quiz" onClick={() => setTab("quiz")}>
          {t("quiz")}
        </TabsTrigger>
        <TabsTrigger
          value="result"
          onClick={() => setTab("result")}
          disabled={!sortedResult || sortedResult?.length === 0}
        >
          {t("result")}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="quiz">
        <form
          className="flex gap-2 items-center mb-4 z-10 flex-col"
          onSubmit={submitHandler}
        >
          <Textarea
            id="inputField"
            className="w-64 min-h-24 max-w-xs p-2 border border-gray-300 rounded"
            placeholder={placeholder}
            autoComplete="off"
            disabled={isProcessing}
          />

          <LoadingButton
            type="submit"
            isLoading={isLoading}
            loadingText="loading..."
            disabled={isProcessing}
          >
            {t("submit")}
          </LoadingButton>
        </form>
      </TabsContent>
      <TabsContent value="result">
        <div className="flex flex-col md:flex-row gap-4 pt-4 pb-8">
          {sortedResult?.slice(0, 3).map((item: any, index: number) => (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              initial="hidden"
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.5 },
                },
              }}
              animate="visible"
              whileHover={{
                scale: 1,
                rotate: "5deg",
                zIndex: 10,
                transition: {
                  duration: 0.3,
                  type: "spring",
                  stiffness: 150,
                  damping: 20,
                },
              }}
            >
              <div className="rounded-md bg-white px-2 py-1 text-sm font-bold shadow-md">
                {item.originalData.type}&nbsp;({item.percentage}%)
              </div>
              <Image
                className="mt-2 size-24 rounded-2xl border-[6px] border-white object-cover shadow-xl md:size-36"
                src={`/mbti/${item.originalData.type.toUpperCase()}.png`}
                alt={item.originalData.type}
                width={150}
                height={150}
              />
            </motion.div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
