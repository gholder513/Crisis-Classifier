import { TrainingCollection, User } from '../types';

export const getCollections = (userId: string): TrainingCollection[] => {
  const collections = localStorage.getItem(`collections_${userId}`);
  return collections ? JSON.parse(collections) : [];
};

export const saveCollection = (collection: TrainingCollection): void => {
  const userId = collection.userId;
  const collections = getCollections(userId);
  
  const existingIndex = collections.findIndex(c => c.id === collection.id);
  if (existingIndex >= 0) {
    collections[existingIndex] = collection;
  } else {
    collections.push(collection);
  }
  
  localStorage.setItem(`collections_${userId}`, JSON.stringify(collections));
};

export const createCollection = (
  name: string,
  description: string,
  userId: string
): TrainingCollection => {
  const collection: TrainingCollection = {
    id: crypto.randomUUID(),
    name,
    description,
    createdAt: new Date(),
    articles: [],
    userId
  };
  
  saveCollection(collection);
  return collection;
};