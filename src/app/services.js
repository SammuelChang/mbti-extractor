export function getTranslatedText(text) {
  return fetch(`/translate?text=${encodeURIComponent(text)}`).then(res => res.json());
}

export function getSimilarity(text) {
  return fetch(`/similarity?text=${encodeURIComponent(text)}`).then(res => res.json());
}