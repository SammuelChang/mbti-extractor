import { NextRequest, NextResponse } from "next/server";
import { mbtiList } from "@/../data";
import { IMbti } from "@/../interface";
import { sentenceExtractor } from "./extract";

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

    const textObj = {
      type: "",
      trait: textParam.trim(),
    };
    const result = await sentenceExtractor(
      textObj,
      mbtiList,
      (item: IMbti) => item.trait
    );

    return NextResponse.json(result);
  } catch (error) {
    const errorMessage = (error as Error).message;

    return NextResponse.json(
      { error: "Failed to load model", details: errorMessage },
      { status: 500 }
    );
  }
}
