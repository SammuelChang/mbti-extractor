import { NextRequest, NextResponse } from "next/server";
import { pipeline } from "@huggingface/transformers";
import { mbtiList } from "@/../data";

export async function GET(request: NextRequest) {
  // 獲取請求的查詢參數
  const { searchParams } = new URL(request.url);
  const textParam = searchParams.get("text"); // 獲取 'text' 參數

  // 如果沒有提供文字參數，返回錯誤
  if (!textParam) {
    return NextResponse.json(
      { error: "Text parameter required!" },
      { status: 400 }
    );
  }

  const sentences = [{ type: "", trait: textParam }].concat(mbtiList);

  // 確保至少有兩個句子進行比較
  if (sentences.length < 2) {
    return NextResponse.json(
      { error: "請提供至少兩個句子進行比較" },
      { status: 400 }
    );
  }

  // 創建特徵提取管道
  const extractor = await pipeline(
    "feature-extraction",
    "Xenova/all-MiniLM-L6-v2"
  );

  // 計算句子嵌入
  const output = await extractor(
    sentences.map((s) => s.trait || s),
    { pooling: "mean", normalize: true }
  );

  // 將 Tensor 轉換為嵌套的陣列
  const embeddings = output.tolist();

  // 使用第一個句子的嵌入來計算與其他句子的相似度
  const firstEmbedding = embeddings[0];
  const similarResults = sentences
    .slice(1)
    .map((sentence, index) => {
      const similarity = cosineSimilarity(
        firstEmbedding,
        embeddings[index + 1]
      );
      return {
        type: sentence.type,
        similarity: similarity,
      };
    })
    .sort((a, b) => b.similarity - a.similarity);

  // 返回第一個句子的嵌入和相似度結果
  return NextResponse.json({
    target: textParam,
    similarResults,
  });
}

// 計算餘弦相似度的函數
function cosineSimilarity(vecA: number[], vecB: number[]) {
  const dotProduct = vecA.reduce(
    (sum, val, index) => sum + val * vecB[index],
    0
  );
  const magnitudeA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}
