export interface Article {
  url: string;
  content?: string;
  isCrisis?: boolean;
  prediction?: boolean;
  confidence?: number;
}

export interface ClassifierModel {
  train: (articles: Article[]) => void;
  predict: (article: Article) => { isCrisis: boolean; confidence: number };
  isReady: boolean;
}

export interface User {
  email: string;
  name: string;
  isAdmin: boolean; // Added isAdmin flag
}

export interface TrainingCollection {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  articles: Article[];
  userId: string;
  isPublic: boolean; // Added isPublic flag for admin-trained models
  trainedByAdmin: boolean; // Added trainedByAdmin flag
}