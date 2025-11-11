// Export all services
export { default as apiClient, authAPI, recipesAPI, usersAPI, categoriesAPI, apiUtils, APIError } from './api';
export { default as mockData, mockUsers, mockRecipes, mockCategories, mockDataUtils, simulateApiDelay } from './mockData';
export { default as storage, StorageService, STORAGE_KEYS } from './storage';

// Re-export commonly used utilities for convenience
export {
  // API utilities
  authAPI,
  recipesAPI,
  usersAPI
} from './api';

export {
  // Mock data utilities
  mockDataUtils
} from './mockData';