"use client";

import DOMPurify from "dompurify";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { placeholderList } from "../../../data";
import { ISimilarity } from "../../../interface";
import { getSimilarity } from "../services";
import { motion } from "framer-motion";

type IProgress = "idle" | "translating" | "extract" | "success" | "error";

export default function Describe() {
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

    setProgress("extract");
    const result = await getSimilarity(sanitizedText);
    setTimeout(() => {
      setResult(result);
      setProgress("success");
    }, 500);
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

        <Button type="submit" disabled={pending} className="w-48 mt-8">
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
