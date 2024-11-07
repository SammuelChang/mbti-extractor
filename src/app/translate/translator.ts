import { pipeline } from "@huggingface/transformers";

let pipe: any = null;

export async function initTranslator() {
  try {
    if (pipe) return { message: "Model already loaded" };

    pipe = await pipeline("translation", "Xenova/opus-mt-zh-en");
    return { message: "Model loaded" };
  } catch (error: any) {
    return { error: "Failed to load model", details: error.message };
  }
}

export async function Translator(text: string) {
  try {
    if (!pipe) {
      pipe = await pipeline("translation", "Xenova/opus-mt-zh-en");
    }

    const output = await pipe(text); // [{"translation_text":"HERE ARE THE TRANSLATED TEXT"}]
    return output[0]?.translation_text;
  } catch (error: any) {
    return { error: "Failed to load model", details: error.message };
  }
}
