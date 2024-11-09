"use server";

import { ISimilarity } from "../../interface";

export async function getTranslatedText(text: string): Promise<string> {
  const response = await fetch(
    `http://localhost:3000/translate?text=${encodeURIComponent(text)}`
  );
  return response.text();
}

export async function getSimilarity(text: string): Promise<ISimilarity> {
  const response = await fetch(
    `http://localhost:3000/similarity?text=${encodeURIComponent(text)}`
  );
  return response.json();
}
