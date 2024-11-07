import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isContainChinese(text: string) {
  const chineseCount = (text.match(/[\u4e00-\u9fa5]/g) || []).length;

  if (chineseCount > 0) {
    return true;
  }

  return false;
}
