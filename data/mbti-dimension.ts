import { IMbtiDimension } from "../interface";

export const mbtiDimension: IMbtiDimension[] = [
  {
    categoryName: "energy",
    categoryList: [
      {
        type: "I",
        name: "Introvert",
        trait: "Reflective, reserved, and private",
      },
      {
        type: "E",
        name: "Extravert",
        trait: "Outgoing, expressive, and enthusiastic",
      },
    ],
  },
  {
    categoryName: "cognition",
    categoryList: [
      {
        type: "S",
        name: "Sensing",
        trait: "Practical, realistic, and observant",
      },
      {
        type: "N",
        name: "Intuition",
        trait: "Imaginative, innovative, and insightful",
      },
    ],
  },
  {
    categoryName: "decisions",
    categoryList: [
      {
        type: "T",
        name: "Thinking",
        trait: "Logical, objective, and rational",
      },
      {
        type: "F",
        name: "Feeling",
        trait: "Empathetic, compassionate, and cooperative",
      },
    ],
  },
  {
    categoryName: "structure",
    categoryList: [
      {
        type: "J",
        name: "Judging",
        trait: "Organized, decisive, and methodical",
      },
      {
        type: "P",
        name: "Perceiving",
        trait: "Adaptable, flexible, and spontaneous",
      },
    ],
  },
];
