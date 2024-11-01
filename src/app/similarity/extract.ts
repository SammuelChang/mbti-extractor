import { pipeline } from "@huggingface/transformers";

let extractor: any = null;

function cosineSimilarity(vecA: number[], vecB: number[]) {
  const dotProduct = vecA.reduce(
    (sum, val, index) => sum + val * vecB[index],
    0
  );
  const magnitudeA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}

function cosineSimilarityToPercentage(similarity: number): number {
  return Math.floor(((similarity + 1) / 2) * 100);
}

export async function sentenceExtractor(
  main: any,
  references: any[],
  iterator: (value: any) => any
) {
  if (main.length === 0 || references.length === 0)
    throw new Error("Text must be at least 2 characters long");

  if (!extractor) {
    extractor = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  }

  try {
    const output = await extractor(
      [iterator(main)].concat(references.map(iterator)),
      {
        pooling: "mean",
        normalize: true,
      }
    );

    const embeddings = output.tolist();

    const firstEmbedding = embeddings[0];
    const similarResults = references.map((sentence, index) => {
      const similarity = cosineSimilarity(
        firstEmbedding,
        embeddings[index + 1]
      );
      return {
        type: sentence.type,
        similarity: similarity,
        percentage: cosineSimilarityToPercentage(similarity),
      };
    });

    return {
      target: main,
      similarResults,
    };
  } catch (error: any) {
    return { error: error.message };
  }
}
