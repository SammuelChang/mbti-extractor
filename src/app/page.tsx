"use client";

import Image from "next/image";
import { ChevronRight } from "lucide-react";
import ImagesReveal from "./components/images-reveal";
import Link from "next/link";
import { motion } from "framer-motion";
import { mbtiList } from "../../data/mbti-list";

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
      <section className="flex gap-4 z-10 flex-col md:flex-row justify-center md:mt-24 mt-8">
        <Link href="/description">
          <motion.div
            className="md:h-36 bg-accent rounded-md flex items-center p-4 gap-4 justify-between"
            initial="initial"
            animate="initial"
            whileHover="animate"
          >
            <div className="flex items-center gap-2">
              <Image
                src="/path_brain.png"
                alt="path_brain"
                width={50}
                height={50}
              />
              <div>Describe Myself</div>
            </div>
            <motion.div
              variants={{
                initial: { x: -10 },
                animate: { x: 0, transition: { duration: 0.5 } },
              }}
            >
              <ChevronRight size={18} />
            </motion.div>
          </motion.div>
        </Link>
        <Link href="/choices">
          <motion.div
            className="md:h-36 bg-accent rounded-md flex items-center p-4 gap-4 justify-between"
            initial="initial"
            animate="initial"
            whileHover="animate"
          >
            <div className="flex items-center gap-2">
              <Image
                src="/path_quiz.png"
                alt="path_quiz"
                width={50}
                height={50}
              />
              <div>Take a Quiz with 8Qs</div>
            </div>
            <motion.div
              variants={{
                initial: { x: -10 },
                animate: { x: 0, transition: { duration: 0.5 } },
              }}
            >
              <ChevronRight size={18} />
            </motion.div>
          </motion.div>
        </Link>
      </section>
    </>
  );
}
