import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface CardProps {
  src: string;
  type: string;
  angle: string;
}

interface CustomProps {
  index: number;
  angle: string;
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.2 },
  visible: (custom: CustomProps) => ({
    opacity: 1,
    scale: 1,
    rotate: custom.angle,
    transition: {
      delay: custom.index * 0.1,
      duration: 0.3,
      type: "spring",
      stiffness: 150,
      damping: 20,
      mass: 0.5,
    },
  }),
};

export default function ImagesReveal({ cards }: { cards: CardProps[] }) {
  return (
    <div className="relative my-10 ml-10 flex flex-row justify-center md:ml-20">
      {cards.slice(0, 5).map((card, i) => (
        <div key={i} className="relative -ml-10 md:-ml-20">
          <motion.div
            className="relative"
            custom={{ index: i, angle: card.angle }}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{
              scale: 1,
              rotate: "0deg",
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
                {card.type}
              </span>
            </div>

            <Image
              className="size-24 rounded-2xl border-[6px] border-white object-cover shadow-xl md:size-36"
              src={card.src}
              alt={card.type}
              width={150}
              height={150}
            />
          </motion.div>
        </div>
      ))}
    </div>
  );
}
