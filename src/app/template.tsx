"use client";

import { WavyBackground } from "@/components/framer-motion/wavy-background";
import { mbtiList } from "../../data";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col items-center justify-start pt-12 pb-24 px-12 overflow-x-auto">
      <WavyBackground className="max-w-4xl mx-auto">
        <p className="text-2xl md:text-4xl lg:text-7xl font-bold inter-var text-center">
          MBTI Extractor
        </p>
        <p className="text-base md:text-lg mt-4 font-normal inter-var text-center mb-12">
          Discover your MBTI type by writing a few sentences about yourself.
        </p>
      </WavyBackground>
      {children}
    </main>
  );
}
