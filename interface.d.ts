export interface IMbti {
  type: string;
  trait: string;
}

export interface IMbtiAnalysis {
  type: string;
  similarity: number;
}

export interface ISimilarity {
  target: string;
  similarResults: IMbtiAnalysis[];
}
