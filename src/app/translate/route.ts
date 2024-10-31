import { NextRequest, NextResponse } from "next/server";
import { pipeline } from "@huggingface/transformers";

interface ITranslation {
  translation_text: string;
}

export async function GET(request: NextRequest) {
  // 獲取請求的查詢參數
  const { searchParams } = new URL(request.url);
  const textParam = searchParams.get("text"); // 獲取 'text' 參數

  // 如果沒有提供文字參數，返回錯誤
  if (!textParam) {
    return NextResponse.json({ error: "請提供文字參數" }, { status: 400 });
  }

  // 創建特徵提取管道
  const pipe = await pipeline("translation", "Xenova/opus-mt-zh-en");

  // 計算句子嵌入
  const output = await pipe(textParam); // [{"translation_text":"HERE ARE THE TRANSLATED TEXT"}]

  return NextResponse.json(output[0]?.translation_text);
}
