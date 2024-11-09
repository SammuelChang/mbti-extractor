"use server";

import { ISimilarity } from "../../interface";

const host = process.env.NEXT_PUBLIC_API_URL;

export async function getTranslatedText(text: string): Promise<string> {
  const response = await fetch(
    `${host}translate?text=${encodeURIComponent(text)}`
  );
  return response.text();
}

export async function getSimilarity(text: string): Promise<ISimilarity> {
  const response = await fetch(
    `${host}/similarity?text=${encodeURIComponent(text)}`
  );
  return response.json();
}
