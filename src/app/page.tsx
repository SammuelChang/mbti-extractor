"use client";

import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { getSimilarity, getTranslatedText } from "./services";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ISimilarity } from "../../interface";
import Image from "next/image";
import ImagesReveal from "./components/images-reveal";
import { mbtiList, placeholderList } from "../../data";
import { motion } from "framer-motion";
import { WavyBackground } from "@/components/framer-motion/wavy-background";
import Spinner from "@/components/ui/spinner";

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

type IProgress = "idle" | "translating" | "extract" | "success" | "error";

export default function Home() {
  const [result, setResult] = useState<null | ISimilarity>(null);
  const [progress, setProgress] = useState<IProgress>("idle");
  const [placeholder, setPlaceholder] = useState<string>(placeholderList[0]);
  const pending = progress === "translating" || progress === "extract";
  const sortedResult = result?.similarResults?.sort(
    (a, b) => b.similarity - a.similarity
  );

  const getData = async (text: string) => {
    if (!text) return;
    const sanitizedText = DOMPurify.sanitize(text);

    const isChinese = isContainChinese(sanitizedText);

    if (isChinese) {
      setProgress("translating");
      const translatedText = await getTranslatedText(sanitizedText);
      setProgress("extract");
      const result = await getSimilarity(translatedText);
      setTimeout(() => {
        setResult(result);
        setProgress("success");
      }, 500);
    } else {
      setProgress("extract");
      const result = await getSimilarity(sanitizedText);
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
      setPlaceholder(placeholderList[index]);
      index = (index + 1) % placeholderList.length;
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="h-dvh flex flex-col items-center justify-start pt-12 pb-24 px-12">
      <WavyBackground className="max-w-4xl mx-auto">
        <p className="text-2xl md:text-4xl lg:text-7xl font-bold inter-var text-center">
          MBTI Extractor
        </p>
        <p className="text-base md:text-lg mt-4 font-normal inter-var text-center mb-12">
          Discover your MBTI type by writing a few sentences about yourself.
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
            {sortedResult?.similarResults?.slice(0, 3).map((item, index) => (
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
