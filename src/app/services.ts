import { ISimilarity } from "../../interface";

export function getTranslatedText(text: string): Promise<string> {
  return fetch(`/translate?text=${encodeURIComponent(text)}`).then((res) =>
    res.json()
  );
}

export function getSimilarity(text: string): Promise<ISimilarity> {
  return fetch(`/similarity?text=${encodeURIComponent(text)}`).then((res) =>
    res.json()
  );
}
