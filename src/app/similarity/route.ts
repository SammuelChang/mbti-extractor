import { NextRequest, NextResponse } from "next/server";
import { pipeline } from "@huggingface/transformers";
import { mbtiList } from "@/../data";
import { IMbti } from "@/../interface";

function cosineSimilarityToPercentage(similarity: number): number {
  return Math.floor(((similarity + 1) / 2) * 100);
}

let extractor: any = null;
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

    const sentences: IMbti[] = [{ type: "", trait: textParam }].concat(
      mbtiList
    );

    if (sentences.length < 2) {
      return NextResponse.json(
        { error: "請提供至少兩個句子進行比較" },
        { status: 400 }
      );
    }

    if (!extractor) {
      extractor = await pipeline(
        "feature-extraction",
        "Xenova/all-MiniLM-L6-v2"
      );
    }

    const output = await extractor(
      sentences.map((s) => s.trait || s),
      { pooling: "mean", normalize: true }
    );

    const embeddings = output.tolist();

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
          percentage: cosineSimilarityToPercentage(similarity),
        };
      })
      // .filter((result) => result.similarity > 0.5)
      .sort((a, b) => b.similarity - a.similarity);

    return NextResponse.json({
      target: textParam,
      similarResults,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load model", details: error.message },
      { status: 500 }
    );
  }
}

function cosineSimilarity(vecA: number[], vecB: number[]) {
  const dotProduct = vecA.reduce(
    (sum, val, index) => sum + val * vecB[index],
    0
  );
  const magnitudeA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}
