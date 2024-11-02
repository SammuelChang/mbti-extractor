import { IMbti, IMbtiCatrgory } from "./interface";

export const mbtiList: IMbti[] = [
  {
    type: "ISTJ",
    trait:
      "Reserved, focused, achieving success through reliability and attention to detail. Practical, down-to-earth, realistic, and accountable. Make decisions through reasoned judgment, working steadily toward goals without being sidetracked. Take pride in maintaining structure and order—in their tasks, environment, and lifestyle. Strongly value tradition and loyalty.",
  },
  {
    type: "ISFJ",
    trait:
      "Calm, approachable, dutiful, and considerate. Dedicated and consistent in fulfilling responsibilities. Meticulous, attentive, and precise. Loyal, thoughtful, remembering small details about those important to them and sensitive to others’ emotions. Aim to create an organized and peaceful environment both at work and at home.",
  },
  {
    type: "INFJ",
    trait:
      "Seek purpose and depth in ideas, relationships, and material interests. Curious about others' motivations and perceptive of others. Principled and aligned with personal values. Develop a clear vision to contribute to the greater good. Structured and resolute in actualizing their vision.",
  },
  {
    type: "INTJ",
    trait:
      "Possess creative minds and a strong drive to bring ideas to fruition. Recognize patterns quickly in external events, forming long-term perspectives. When committed, plan and execute tasks thoroughly. Independent and analytical, with high standards for performance and expertise—both for themselves and others.",
  },
  {
    type: "ISTP",
    trait:
      "Adaptable and open-minded, quiet observers until an issue arises, then act swiftly to resolve it. Analyze mechanics and delve through extensive information to distill practical solutions. Value logical structure, cause-effect reasoning, and efficiency.",
  },
  {
    type: "ISFP",
    trait:
      "Quiet, easygoing, considerate, and empathetic. Appreciate the present and what’s happening around them. Prefer personal space and working at their own pace. Loyal to their values and to significant people in their lives. Dislike conflict; avoid imposing their views or values on others.",
  },
  {
    type: "INFP",
    trait:
      "Idealistic, loyal to their values and supportive of close relationships. Seek to live consistently with their principles. Open-minded, quick to envision possibilities, and can inspire change. Strive to understand others and help them reach their potential. Adaptable, accepting, and resilient unless a core value is threatened.",
  },
  {
    type: "INTP",
    trait:
      "Driven to create logical explanations for whatever captures their interest. Abstract and theoretical, focusing on concepts rather than social engagement. Quiet, self-contained, adaptable. Capable of intense concentration to solve issues in their chosen area. Analytical, often skeptical, sometimes critical.",
  },
  {
    type: "ESTP",
    trait:
      "Flexible and tolerant, take a results-oriented approach to immediate challenges. Prefer action to theories and find energy in solving issues hands-on. Enjoy the present, spontaneous, and engage actively with others. Appreciate comfort and aesthetics. Best learn by direct experience.",
  },
  {
    type: "ESFP",
    trait:
      "Outgoing, sociable, and open-minded. Have a zest for life, people, and material comforts. Enjoy collaborative efforts to accomplish goals. Bring common sense and practicality to work and make activities enjoyable. Adaptable and spontaneous, adjust easily to new people and situations. Learn effectively through practice and social interaction.",
  },
  {
    type: "ENFP",
    trait:
      "Energetic, imaginative, and enthusiastic. View life as full of opportunities. Rapidly make connections across ideas and events, acting confidently on patterns they recognize. Seek validation from others and are generous with praise. Spontaneous and flexible, often relying on their creativity and verbal skills.",
  },
  {
    type: "ENTP",
    trait:
      "Quick-witted, inventive, and lively. Adept at tackling new and complex challenges. Skilled in generating innovative possibilities and then strategically analyzing them. Intuitive about others’ motivations. Dislike repetitive tasks, preferring new interests and approaches.",
  },
  {
    type: "ESTJ",
    trait:
      "Practical, grounded, straightforward. Decisive, take action quickly on plans. Skilled in organizing tasks and managing people to achieve efficient outcomes. Detail-oriented and consistent. Adhere to logical standards and encourage others to do the same. Confident in advancing their plans.",
  },
  {
    type: "ESFJ",
    trait:
      "Warm, responsible, and cooperative. Seek harmony in their surroundings and work with commitment to establish it. Enjoy collaborating to complete tasks accurately and punctually. Loyal, attend to details, including minor ones. Attentive to others’ needs and eager to help. Want recognition for their contributions.",
  },
  {
    type: "ENFJ",
    trait:
      "Kind-hearted, empathetic, supportive, and conscientious. Sensitive to others’ emotions, needs, and motivations. See potential in everyone and strive to help others achieve it. Often encourage personal and group growth. Receptive to praise and constructive criticism. Socially adept, facilitate group dynamics, and provide motivational leadership.",
  },
  {
    type: "ENTJ",
    trait:
      "Direct, assertive, naturally take on leadership roles. Quickly identify inefficiencies, developing and executing comprehensive solutions. Enjoy setting long-term goals and planning strategically. Well-informed, curious, and eager to share knowledge with others. Assertive in presenting their ideas.",
  },
];

export const mbtiTraitList: IMbtiCatrgory[] = [
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

export const placeholderList = [
  "Gain energy from solitude, prefer facts, value logic, and enjoy structured plans.",
  "Thrive in social settings, imagine possibilities, focus on harmony, and stay open to spontaneity.",
  "Enjoy one-on-one talks, find patterns, balance empathy with logic, and adapt easily to changes.",
  "喜愛安靜時光，重視細節，偏好理性分析，並享受有計劃的安排。",
  "社交活力滿滿，愛幻想未來，重視人際和諧，享受隨機應變的生活。",
  "喜愛深度對話，注重全局，兼顧理性與感性，樂於接受變化。",
];
