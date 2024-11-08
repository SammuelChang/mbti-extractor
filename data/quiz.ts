const quizListEn = [
  {
    question: "What is your favorite social activity?",
    options: [
      "Attend a lively party and make new friends",
      "Quietly chat with close friends",
      "Stay home alone and watch movies or read",
      "Attend a professional conference to learn new things",
    ],
  },
  {
    question: "When you have a new idea, what do you usually do?",
    options: [
      "Immediately put it into action and see the results",
      "Carefully plan out each step to ensure smooth execution",
      "First gather input and opinions from others",
      "Reflect deeply, weigh the pros and cons",
    ],
  },
  {
    question: "In an emergency situation, how do you typically react?",
    options: [
      "Remain calm and make decisions quickly",
      "First understand the situation, then take action",
      "Consider others' feelings, aiming for a complete resolution",
      "Feel anxious and worried, struggle to make a firm decision",
    ],
  },
  {
    question: "How do you view the mistakes you've made?",
    options: [
      "Can easily let go and no longer dwell on them",
      "Deeply reflect on them, strive to avoid repeating them",
      "Feel upset about them for a long time, doubt own abilities",
      "Usually seek comfort and affirmation from others",
    ],
  },
  {
    question: "When making decisions, what is your typical approach?",
    options: [
      "Prioritize logic and practical effectiveness",
      "First consider the feelings and needs of others",
      "Rely on personal intuition and gut instinct",
      "Carefully compare the various possible options",
    ],
  },
  {
    question: "What is your typical daily schedule like?",
    options: [
      "Spontaneous, without a fixed routine",
      "Clearly planned out, following a set schedule",
      "Somewhat flexible, but with a basic schedule",
      "Difficult to maintain a consistent routine, often changes",
    ],
  },
  {
    question: "When faced with new things, how do you react?",
    options: [
      "Strong curiosity, actively explore",
      "Observe cautiously, don't rush to make judgments",
      "Feel excited, immediately try it out",
      "Think carefully, worry about potential problems",
    ],
  },
  {
    question: "In social situations, you are typically:",
    options: [
      "Proactive in starting conversations and making new connections",
      "Quietly observe others, wait for them to introduce themselves",
      "Chat with familiar friends, not very active in meeting new people",
      "Sometimes actively engage, other times remain quiet",
    ],
  },
];

const quizListZhTW = [
  {
    question: "你最喜歡的社交活動是什麼？",
    options: [
      "參加熱鬧的派對並結交新朋友",
      "安靜地與親密朋友聊天",
      "獨自在家看電影或閱讀",
      "參加專業會議學習新事物",
    ],
  },
  {
    question: "當你有一個新想法時，你通常會怎麼做？",
    options: [
      "立即付諸行動，看看結果",
      "仔細計劃每一步，以確保順利執行",
      "首先收集他人的意見和建議",
      "深入反思，權衡利弊",
    ],
  },
  {
    question: "在緊急情況下，你通常如何反應？",
    options: [
      "保持冷靜，迅速做出決定",
      "首先了解情況，然後採取行動",
      "考慮他人的感受，力求全面解決",
      "感到焦慮和擔憂，難以做出堅定的決定",
    ],
  },
  {
    question: "你如何看待自己犯的錯誤？",
    options: [
      "可以輕鬆放下，不再糾結",
      "深入反思，努力避免重蹈覆轍",
      "對錯誤感到長時間的沮喪，懷疑自己的能力",
      "通常尋求他人的安慰和肯定",
    ],
  },
  {
    question: "做決定時，你的典型方法是什麼？",
    options: [
      "優先考慮邏輯和實際效果",
      "首先考慮他人的感受和需求",
      "依靠個人直覺和本能",
      "仔細比較各種可能的選擇",
    ],
  },
  {
    question: "你的典型日常安排是什麼樣的？",
    options: [
      "隨性，沒有固定的日程",
      "明確計劃，遵循設定的時間表",
      "有些靈活，但有基本的日程安排",
      "難以保持一致的日程，經常變化",
    ],
  },
  {
    question: "面對新事物時，你如何反應？",
    options: [
      "強烈的好奇心，積極探索",
      "謹慎觀察，不急於做出判斷",
      "感到興奮，立即嘗試",
      "仔細思考，擔心潛在問題",
    ],
  },
  {
    question: "在社交場合中，你通常是怎樣的？",
    options: [
      "主動開始對話並結交新朋友",
      "安靜地觀察他人，等待他們自我介紹",
      "與熟悉的朋友聊天，不太積極結識新朋友",
      "有時積極參與，有時保持安靜",
    ],
  },
];

export const quizList: Record<string, typeof quizListEn> = {
  en: quizListEn,
  "zh-TW": quizListZhTW,
};
