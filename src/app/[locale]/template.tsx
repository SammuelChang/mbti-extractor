"use client";

import { WavyBackground } from "@/components/framer-motion/wavy-background";
import { useTranslations } from "next-intl";

export default function Template({ children }: { children: React.ReactNode }) {
  const t = useTranslations("HomePage");

  return (
    <main className="flex flex-col items-center justify-start pt-12 pb-8 md:pb-24 px-12 overflow-x-auto">
      <WavyBackground className="max-w-4xl mx-auto">
        <p className="text-2xl md:text-4xl lg:text-7xl font-bold inter-var text-center">
          {t("title")}
        </p>
        <p className="text-base md:text-lg mt-4 font-normal inter-var text-center mb-12">
          {t("subTitle")}
        </p>
      </WavyBackground>
      {children}
    </main>
  );
}
