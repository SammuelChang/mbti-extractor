import { NextRequest, NextResponse } from "next/server";
import { pipeline } from "@huggingface/transformers";

let pipe: any = null;
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const textParam = searchParams.get("text");

    if (!textParam || textParam.trim().length < 2) {
      return NextResponse.json(
        { error: "Text must be at least 2 characters long" },
        { status: 400 }
      );
    }

    if (!pipe) {
      pipe = await pipeline("translation", "Xenova/opus-mt-zh-en");
    }

    const output = await pipe(textParam); // [{"translation_text":"HERE ARE THE TRANSLATED TEXT"}]

    return NextResponse.json(output[0]?.translation_text);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load model", details: error.message },
      { status: 500 }
    );
  }
}
