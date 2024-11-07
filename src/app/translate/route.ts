import { NextRequest, NextResponse } from "next/server";
import { pipeline } from "@huggingface/transformers";
import { Translator } from "./translator";

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

    const result = await Translator(textParam);

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to load model", details: error.message },
      { status: 500 }
    );
  }
}
