"use client";

import Image from "next/image";
import { mbtiList } from "../../data";
import { ChevronRight } from "lucide-react";
import ImagesReveal from "./components/images-reveal";
import Link from "next/link";

const cards = mbtiList.map((item, index) => {
  return {
    src: `/mbti/${item.type.toUpperCase()}.png`,
    type: item.type.toUpperCase(),
    angle: `${Math.random() * 30 - 15}deg`,
  };
});

export default function Home() {
  return (
    <>
      <ImagesReveal cards={cards} />
      <section className="flex gap-4 z-10 flex-col md:flex-row justify-center md:mt-24">
        <Link href="/description">
          <div className="md:h-36 bg-accent rounded-md flex items-center p-4 gap-2">
            <Image
              src="/path_brain.png"
              alt="path_brain"
              width={50}
              height={50}
            />
            <div>I can do MCQ quiz</div>
            <ChevronRight size={18} />
          </div>
        </Link>
        <Link href="/choices">
          <div className="md:h-36 bg-accent rounded-md flex items-center p-4 gap-2">
            <Image
              src="/path_quiz.png"
              alt="path_quiz"
              width={50}
              height={50}
            />
            <div>I can do MCQ quiz</div>
            <ChevronRight size={18} />
          </div>
        </Link>
      </section>
    </>
  );
}
