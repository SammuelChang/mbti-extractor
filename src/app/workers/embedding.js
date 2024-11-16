import { pipeline } from "@huggingface/transformers";

function cosineSimilarity(vecA, vecB) {
    const dotProduct = vecA.reduce((sum, val, index) => sum + val * vecB[index], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magnitudeA * magnitudeB);
}

function cosineSimilarityToPercentage(similarity) {
    return Math.floor(((similarity + 1) / 2) * 100);
}

function get(objectParam, pathParam, defaultValue) {
    const path = Array.isArray(pathParam) ? pathParam : pathParam.split('.');
    let object = objectParam;

    for (let index = 0; index < path.length; index++) {
        if (object == null) return defaultValue;
        object = object[String(path[index])];
    }

    return object !== undefined ? object : defaultValue;
}

class EmbeddingSingleton {
    static task = "feature-extraction";
    static model = "Xenova/all-MiniLM-L6-v2";
    static instance = null;

    static async getInstance(progress_callback = null) {
        if (!this.instance) {
            this.instance = await pipeline(this.task, this.model, { progress_callback });
        }
        return this.instance;
    }
}

self.addEventListener('message', async (event) => {
    const { array, pathParam } = event.data;
    const main = get(array[0], pathParam);
    const references = array.slice(1).map((x) => get(x, pathParam));

    const classifier = await EmbeddingSingleton.getInstance(x => self.postMessage(x));

    const output = await classifier(array.map((x) => get(x, pathParam)), {
        pooling: "mean",
        normalize: true,
    });
    const embeddings = output.tolist();
    const firstEmbedding = embeddings[0];
    const similarResults = references.map((_, index) => {
        const similarity = cosineSimilarity(firstEmbedding, embeddings[index + 1]);
        return {
            originalData: array[index + 1],
            similarity,
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
