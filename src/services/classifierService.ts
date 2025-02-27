import { Article, ClassifierModel } from '../types';

class OneClassClassifier implements ClassifierModel {
  private threshold = 0.3; // Adjustable threshold for classification
  private featureVectors: Map<string, number>[] = [];
  private vocabulary: Set<string> = new Set();
  isReady = false;

  private preprocessText(text: string): string[] {
    // Convert to lowercase and tokenize
    const tokens = text.toLowerCase().split(/\W+/);
    
    // Remove stopwords and short tokens
    const stopwords = new Set(['the', 'and', 'a', 'an', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by']);
    return tokens.filter(token => 
      token.length > 2 && !stopwords.has(token)
    );
  }

  private buildVocabulary(articles: Article[]): void {
    // Reset vocabulary
    this.vocabulary = new Set();
    
    // Add all tokens to vocabulary
    articles.forEach(article => {
      if (article.content) {
        const tokens = this.preprocessText(article.content);
        tokens.forEach(token => this.vocabulary.add(token));
      }
    });
  }

  private documentToVector(text: string): Map<string, number> {
    const tokens = this.preprocessText(text);
    const vector = new Map<string, number>();
    
    // Count occurrences of each token
    tokens.forEach(token => {
      if (this.vocabulary.has(token)) {
        const count = vector.get(token) || 0;
        vector.set(token, count + 1);
      }
    });
    
    // Normalize vector
    const sum = Array.from(vector.values()).reduce((acc, val) => acc + val, 0);
    if (sum > 0) {
      for (const [token, count] of vector.entries()) {
        vector.set(token, count / sum);
      }
    }
    
    return vector;
  }

  private cosineSimilarity(vecA: Map<string, number>, vecB: Map<string, number>): number {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    
    // Calculate dot product
    for (const [token, valueA] of vecA.entries()) {
      const valueB = vecB.get(token) || 0;
      dotProduct += valueA * valueB;
    }
    
    // Calculate magnitudes
    for (const valueA of vecA.values()) {
      normA += valueA * valueA;
    }
    
    for (const valueB of vecB.values()) {
      normB += valueB * valueB;
    }
    
    normA = Math.sqrt(normA);
    normB = Math.sqrt(normB);
    
    return normA && normB ? dotProduct / (normA * normB) : 0;
  }

  train(articles: Article[]): void {
    const crisisArticles = articles.filter(article => article.isCrisis && article.content);
    
    if (crisisArticles.length === 0) {
      console.error('No crisis articles with content for training');
      return;
    }
    
    // Build vocabulary from all articles
    this.buildVocabulary(articles);
    
    // Create feature vectors for crisis articles only
    this.featureVectors = crisisArticles
      .map(article => article.content ? this.documentToVector(article.content) : new Map())
      .filter(vector => vector.size > 0);
    
    this.isReady = this.featureVectors.length > 0;
    console.log(`Model trained with ${this.featureVectors.length} crisis articles and vocabulary size ${this.vocabulary.size}`);
  }

  predict(article: Article): { isCrisis: boolean; confidence: number } {
    if (!this.isReady || !article.content) {
      return { isCrisis: false, confidence: 0 };
    }
    
    const vector = this.documentToVector(article.content);
    
    // Calculate max similarity to any crisis article
    let maxSimilarity = 0;
    for (const featureVector of this.featureVectors) {
      const similarity = this.cosineSimilarity(vector, featureVector);
      maxSimilarity = Math.max(maxSimilarity, similarity);
    }
    
    // Classify based on similarity threshold
    return {
      isCrisis: maxSimilarity > this.threshold,
      confidence: maxSimilarity
    };
  }
}

export const createClassifier = (): ClassifierModel => {
  return new OneClassClassifier();
};