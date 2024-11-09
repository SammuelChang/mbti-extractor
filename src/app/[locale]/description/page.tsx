"use client";

import DOMPurify from "dompurify";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { ISimilarity } from "../../../../interface";
import { getSimilarity } from "../../services";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import LoadingButton from "@/app/components/loading-button";

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
  if (locale === "en") {
    return placeholderList;
  } else if (locale === "zh-TW") {
    return placeholderListZhTW;
  } else {
    return placeholderList;
  }
}

type IProgress = "idle" | "translating" | "extracting" | "success" | "error";

export default function Describe() {
  const locale = useLocale();
  const t = useTranslations("Form");
  const [result, setResult] = useState<null | ISimilarity>(null);
  const [progress, setProgress] = useState<IProgress>("idle");
  const [placeholder, setPlaceholder] = useState<string>(
    getLocalePlaceholder(locale)[0]
  );
  const loadingText = () => {
    switch (progress) {
      case "extracting":
        return t("extracting");
      case "translating":
        return t("translating");
      default:
        return t("submit");
    }
  };

  const sortedResult = result?.similarResults?.sort(
    (a, b) => b.similarity - a.similarity
  );

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const inputValue = (
        e.currentTarget.elements.namedItem("inputField") as HTMLInputElement
      ).value;

      if (!inputValue) {
        throw new Error("Input value is empty");
      }
      const sanitizedInputValue = DOMPurify.sanitize(inputValue);
      setProgress("extracting");
      const result = await getSimilarity(sanitizedInputValue);
      setTimeout(() => {
        setResult(result);
        setProgress("success");
      }, 500);
    } catch (error) {
      console.error(error);
      setProgress("error");
    }
  }

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setPlaceholder(getLocalePlaceholder(locale)[index]);
      index = (index + 1) % getLocalePlaceholder(locale).length;
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <form
        className="flex gap-2 items-center mb-4 z-10 flex-col"
        onSubmit={submitHandler}
      >
        <Textarea
          id="inputField"
          className="w-64 min-h-24 max-w-xs p-2 border border-gray-300 rounded"
          placeholder={placeholder}
          autoComplete="off"
        />

        <LoadingButton
          type="submit"
          isLoading={progress === "extracting" || progress === "translating"}
          loadingText={loadingText()}
        >
          {t("submit")}
        </LoadingButton>
      </form>
      <div className="flex flex-col md:flex-row gap-4 pt-4 pb-8">
        {sortedResult?.slice(0, 3).map((item, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center"
            initial="hidden"
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
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
              {item.type}&nbsp;({item.percentage}%)
            </div>
            <Image
              className="mt-2 size-24 rounded-2xl border-[6px] border-white object-cover shadow-xl md:size-36"
              src={`/mbti/${item.type.toUpperCase()}.png`}
              alt={item.type}
              width={150}
              height={150}
            />
          </motion.div>
        ))}
      </div>
    </>
  );
}
