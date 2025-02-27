import axios from 'axios';
import { Article } from '../types';


// Replace this file with backend service calls in a real application
export const fetchArticleContent = async (url: string): Promise<string> => {
  try {
    const response = await axios.get(`https://cors-anywhere.herokuapp.com/${url}`);
    
    // Extract text content from HTML (simplified)
    const parser = new DOMParser();
    const doc = parser.parseFromString(response.data, 'text/html');
    
    // Get text from paragraphs, which typically contain the article content
    const paragraphs = Array.from(doc.querySelectorAll('p')).map(p => p.textContent);
    return paragraphs.join(' ');
  } catch (error) {
    console.error('Error fetching article content:', error);
    
    // For demo purposes, return a placeholder text if fetching fails
    return `This is a placeholder content for ${url}. In a real application, this would contain the actual content of the article.`;
  }
};

export const processArticle = async (article: Article): Promise<Article> => {
  if (!article.content) {
    article.content = await fetchArticleContent(article.url);
  }
  return article;
};