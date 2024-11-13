import { pipeline } from "@huggingface/transformers";

function cosineSimilarity(vecA, vecB) {
    const dotProduct = vecA.reduce(
      (sum, val, index) => sum + val * vecB[index],
      0
    );
    const magnitudeA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magnitudeA * magnitudeB);
}

function cosineSimilarityToPercentage(similarity) {
return Math.floor(((similarity + 1) / 2) * 100);
}
  
class EmbeddingSingleton {
    static task = "feature-extraction";
    static model =  "Xenova/all-MiniLM-L6-v2";
    static instance = null;

    static async getInstance(progress_callback = null) {
        this.instance ??= pipeline(this.task, this.model, { progress_callback });
        return this.instance;
    }
}

self.addEventListener('message', async (event) => {
    const { array, iterator } = event.data;
    const [main, ...references] = iterator(array);

    const classifier = await EmbeddingSingleton.getInstance(x => {
        self.postMessage(x);
    });

    const output = await classifier(iterator(array), {
        pooling: "mean",
        normalize: true,
      });
    const embeddings = output.tolist();
    const firstEmbedding = embeddings[0];
    const similarResults = references.map((string, index) => {
        const similarity = cosineSimilarity(
            firstEmbedding,
            embeddings[index + 1]
        );
        return {
            description: string,
            similarity: similarity,
            percentage: cosineSimilarityToPercentage(similarity),
        };
    });

    self.postMessage({
        status: 'complete',
        output: {
            target: main,
            similarResults,
        },
    });
});
