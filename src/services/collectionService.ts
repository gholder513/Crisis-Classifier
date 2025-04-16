import { TrainingCollection, User } from '../types';

export const getCollections = (userId: string): TrainingCollection[] => {
  // Get all collections
  const allCollections = localStorage.getItem('collections') || '[]';
  const collections: TrainingCollection[] = JSON.parse(allCollections);
  
  // Return collections that are either:
  // 1. Owned by the user
  // 2. Public and trained by admin
  return collections.filter(collection => 
    collection.userId === userId || (collection.isPublic && collection.trainedByAdmin)
  );
};

export const saveCollection = (collection: TrainingCollection): void => {
  const collections = localStorage.getItem('collections') 
    ? JSON.parse(localStorage.getItem('collections')!)
    : [];
  
  const existingIndex: number = collections.findIndex((c: TrainingCollection) => c.id === collection.id);
  if (existingIndex >= 0) {
    collections[existingIndex] = collection;
  } else {
    collections.push(collection);
  }
  
  localStorage.setItem('collections', JSON.stringify(collections));
};

export const createCollection = (
  name: string,
  description: string,
  userId: string,
  isAdmin: boolean
): TrainingCollection => {
  const collection: TrainingCollection = {
    id: crypto.randomUUID(),
    name,
    description,
    createdAt: new Date(),
    articles: [],
    userId,
    isPublic: isAdmin, // Only admin collections are public by default
    trainedByAdmin: isAdmin
  };
  
  saveCollection(collection);
  return collection;
};