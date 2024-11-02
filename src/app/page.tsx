"use client";

import { useEffect, useState, useTransition } from "react";
import { getSimilarity, getTranslatedText } from "./services";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ISimilarity } from "../../interface";
import Image from "next/image";
import ImagesReveal from "./components/images-reveal";
import { mbtiList } from "../../data";
import { motion } from "framer-motion";
import { WavyBackground } from "@/components/animata/image/wavy-background";

const cards = mbtiList.map((item, index) => {
  return {
    src: `/mbti/${item.type.toUpperCase()}.png`,
    type: item.type.toUpperCase(),
    angle: `${Math.random() * 30 - 15}deg`,
  };
});

function isContainChinese(text: string) {
  const chineseCount = (text.match(/[\u4e00-\u9fa5]/g) || []).length;

  if (chineseCount > 0) {
    return true;
  }

  return false;
}

const Spinner = () => {
  return (
    <div role="status" className="mt-1">
      <svg
        aria-hidden="true"
        className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-black"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

const placeholderText = [
  "Gain energy from solitude, prefer facts, value logic, and enjoy structured plans.",
  "Thrive in social settings, imagine possibilities, focus on harmony, and stay open to spontaneity.",
  "Enjoy one-on-one talks, find patterns, balance empathy with logic, and adapt easily to changes.",
  "喜愛安靜時光，重視細節，偏好理性分析，並享受有計劃的安排。",
  "社交活力滿滿，愛幻想未來，重視人際和諧，享受隨機應變的生活。",
  "喜愛深度對話，注重全局，兼顧理性與感性，樂於接受變化。",
];

type IProgress = "idle" | "translating" | "extract" | "success" | "error";

export default function Home() {
  const [result, setResult] = useState<null | ISimilarity>(null);
  const [progress, setProgress] = useState<IProgress>("idle");
  const [placeholder, setPlaceholder] = useState<string>(placeholderText[0]);
  const pending = progress === "translating" || progress === "extract";
  const sortedResult = result?.similarResults?.sort(
    (a, b) => b.percentage - a.percentage
  );

  const getData = async (text: string) => {
    if (!text) return;

    const isChinese = isContainChinese(text);

    if (isChinese) {
      setProgress("translating");
      const translatedText = await getTranslatedText(text);
      setProgress("extract");
      const result = await getSimilarity(translatedText);
      setTimeout(() => {
        setResult(result);
        setProgress("success");
      }, 500);
    } else {
      setProgress("extract");
      const result = await getSimilarity(text);
      setTimeout(() => {
        setResult(result);
        setProgress("success");
      }, 500);
    }
  };

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const inputValue = (
      e.currentTarget.elements.namedItem("inputField") as HTMLInputElement
    ).value;
    getData(inputValue);
  }

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setPlaceholder(placeholderText[index]);
      index = (index + 1) % placeholderText.length;
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="h-dvh flex flex-col items-center justify-start pt-12 pb-24">
      <WavyBackground className="max-w-4xl mx-auto">
        <p className="text-2xl md:text-4xl lg:text-7xl font-bold inter-var text-center">
          MBTI Detecter
        </p>
        <p className="text-base md:text-lg mt-4 font-normal inter-var text-center mb-12">
          Get your MBTI with few words about yourself
        </p>
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

          <Button type="submit" disabled={pending} className="w-48">
            {!pending && "Submit"}
            {progress === "translating" && (
              <>
                <Spinner />
                Translating...
              </>
            )}
            {progress === "extract" && (
              <>
                <Spinner />
                Extracting...
              </>
            )}
          </Button>
        </form>
      </WavyBackground>
      <section className="mt-12">
        {!pending && (
          <div className="flex gap-8 p-4 flex-wrap justify-center">
            {result?.similarResults?.slice(0, 3).map((item, index) => (
              <div key={index} className="relative">
                <motion.div
                  className="relative"
                  initial="hidden"
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
                  {/* Type Label */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 transform">
                    <span className="rounded-md bg-white px-2 py-1 text-sm font-bold shadow-md">
                      {item.type}&nbsp;({item.percentage}%)
                    </span>
                  </div>

                  <Image
                    className="size-24 rounded-2xl border-[6px] border-white object-cover shadow-xl md:size-36"
                    src={`/mbti/${item.type.toUpperCase()}.png`}
                    alt={item.type}
                    width={150}
                    height={150}
                  />
                </motion.div>
              </div>
            ))}
            {!result && <ImagesReveal cards={cards} />}
          </div>
        )}
      </section>
    </main>
  );
}
