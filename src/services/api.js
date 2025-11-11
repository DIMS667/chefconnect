/**
 * API service layer for ChefConnect
 * Handles all HTTP requests and API interactions
 */

import { API_BASE_URL, API_ENDPOINTS, AUTH_TOKEN_KEY } from '../utils/constants';
import { storage } from '../utils/helpers';

// API configuration
const API_CONFIG = {
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * HTTP client class for making API requests
 */
class APIClient {
  constructor(config = {}) {
    this.baseURL = config.baseURL || API_CONFIG.baseURL;
    this.timeout = config.timeout || API_CONFIG.timeout;
    this.defaultHeaders = { ...API_CONFIG.headers, ...config.headers };
  }

  /**
   * Get authentication token from storage
   */
  getAuthToken() {
    return storage.get(AUTH_TOKEN_KEY);
  }

  /**
   * Get headers with authentication if available
   */
  getHeaders(customHeaders = {}) {
    const token = this.getAuthToken();
    const headers = { ...this.defaultHeaders, ...customHeaders };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  }

  /**
   * Make HTTP request with fetch API
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      timeout: this.timeout,
      headers: this.getHeaders(options.headers),
      ...options,
    };

    // Add timeout support
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.timeout);

    try {
      const response = await fetch(url, {
        ...config,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Handle different response types
      const contentType = response.headers.get('content-type');
      let data;

      if (contentType?.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        throw new APIError(
          data?.message || `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          data
        );
      }

      return {
        data,
        status: response.status,
        headers: response.headers,
      };
    } catch (error) {
      clearTimeout(timeoutId);

      if (error.name === 'AbortError') {
        throw new APIError('Request timeout', 408);
      }

      // Re-throw APIError as-is
      if (error instanceof APIError) {
        throw error;
      }

      // Handle network errors
      if (!window.navigator.onLine) {
        throw new APIError('No internet connection', 0);
      }

      throw new APIError(
        error.message || 'Network error occurred',
        0,
        error
      );
    }
  }

  // HTTP methods
  async get(endpoint, params = {}, options = {}) {
    const url = new URL(endpoint, this.baseURL);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.append(key, value);
      }
    });

    return this.request(url.pathname + url.search, {
      method: 'GET',
      ...options,
    });
  }

  async post(endpoint, data = {}, options = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options,
    });
  }

  async put(endpoint, data = {}, options = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options,
    });
  }

  async patch(endpoint, data = {}, options = {}) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
      ...options,
    });
  }

  async delete(endpoint, options = {}) {
    return this.request(endpoint, {
      method: 'DELETE',
      ...options,
    });
  }

  // File upload method
  async upload(endpoint, formData, options = {}) {
    const headers = this.getHeaders(options.headers);
    // Remove Content-Type to let browser set it with boundary for FormData
    delete headers['Content-Type'];

    return this.request(endpoint, {
      method: 'POST',
      body: formData,
      headers,
      ...options,
    });
  }
}

/**
 * Custom API Error class
 */
class APIError extends Error {
  constructor(message, status = 0, data = null) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.data = data;
  }

  get isNetworkError() {
    return this.status === 0;
  }

  get isServerError() {
    return this.status >= 500;
  }

  get isClientError() {
    return this.status >= 400 && this.status < 500;
  }

  get isAuthError() {
    return this.status === 401 || this.status === 403;
  }

  get isNotFound() {
    return this.status === 404;
  }

  get isTimeout() {
    return this.status === 408;
  }
}

// Create API client instance
const apiClient = new APIClient();

/**
 * Auth API endpoints
 */
export const authAPI = {
  async login(credentials) {
    const response = await apiClient.post(API_ENDPOINTS.auth.login, credentials);
    return response.data;
  },

  async register(userData) {
    const response = await apiClient.post(API_ENDPOINTS.auth.register, userData);
    return response.data;
  },

  async logout() {
    const response = await apiClient.post(API_ENDPOINTS.auth.logout);
    return response.data;
  },

  async refreshToken() {
    const response = await apiClient.post(API_ENDPOINTS.auth.refresh);
    return response.data;
  },

  async getProfile() {
    const response = await apiClient.get(API_ENDPOINTS.auth.profile);
    return response.data;
  },

  async updateProfile(updates) {
    const response = await apiClient.patch(API_ENDPOINTS.auth.profile, updates);
    return response.data;
  },

  async changePassword(passwords) {
    const response = await apiClient.post('/auth/change-password', passwords);
    return response.data;
  },

  async forgotPassword(email) {
    const response = await apiClient.post('/auth/forgot-password', { email });
    return response.data;
  },

  async resetPassword(token, password) {
    const response = await apiClient.post('/auth/reset-password', { token, password });
    return response.data;
  },
};

/**
 * Recipes API endpoints
 */
export const recipesAPI = {
  async getRecipes(params = {}) {
    const response = await apiClient.get(API_ENDPOINTS.recipes.list, params);
    return response.data;
  },

  async getRecipe(id) {
    const response = await apiClient.get(API_ENDPOINTS.recipes.detail(id));
    return response.data;
  },

  async createRecipe(recipeData) {
    const response = await apiClient.post(API_ENDPOINTS.recipes.create, recipeData);
    return response.data;
  },

  async updateRecipe(id, updates) {
    const response = await apiClient.put(API_ENDPOINTS.recipes.update(id), updates);
    return response.data;
  },

  async deleteRecipe(id) {
    const response = await apiClient.delete(API_ENDPOINTS.recipes.delete(id));
    return response.data;
  },

  async searchRecipes(query, filters = {}) {
    const params = { q: query, ...filters };
    const response = await apiClient.get(API_ENDPOINTS.recipes.search, params);
    return response.data;
  },

  async getPopularRecipes(limit = 10) {
    const response = await apiClient.get(API_ENDPOINTS.recipes.popular, { limit });
    return response.data;
  },

  async uploadRecipeImage(recipeId, imageFile) {
    const formData = new FormData();
    formData.append('image', imageFile);
    
    const response = await apiClient.upload(
      `${API_ENDPOINTS.recipes.detail(recipeId)}/image`,
      formData
    );
    return response.data;
  },

  async rateRecipe(recipeId, rating) {
    const response = await apiClient.post(
      `${API_ENDPOINTS.recipes.detail(recipeId)}/rate`,
      { rating }
    );
    return response.data;
  },

  async addComment(recipeId, comment) {
    const response = await apiClient.post(
      `${API_ENDPOINTS.recipes.detail(recipeId)}/comments`,
      { comment }
    );
    return response.data;
  },

  async getComments(recipeId, params = {}) {
    const response = await apiClient.get(
      `${API_ENDPOINTS.recipes.detail(recipeId)}/comments`,
      params
    );
    return response.data;
  },
};

/**
 * Users API endpoints
 */
export const usersAPI = {
  async getUser(id) {
    const response = await apiClient.get(API_ENDPOINTS.users.profile(id));
    return response.data;
  },

  async getUserRecipes(id, params = {}) {
    const response = await apiClient.get(API_ENDPOINTS.users.recipes(id), params);
    return response.data;
  },

  async getUserFavorites(id, params = {}) {
    const response = await apiClient.get(API_ENDPOINTS.users.favorites(id), params);
    return response.data;
  },

  async followUser(id) {
    const response = await apiClient.post(API_ENDPOINTS.users.follow(id));
    return response.data;
  },

  async unfollowUser(id) {
    const response = await apiClient.delete(API_ENDPOINTS.users.follow(id));
    return response.data;
  },

  async getFollowers(id, params = {}) {
    const response = await apiClient.get(`/users/${id}/followers`, params);
    return response.data;
  },

  async getFollowing(id, params = {}) {
    const response = await apiClient.get(`/users/${id}/following`, params);
    return response.data;
  },

  async uploadAvatar(imageFile) {
    const formData = new FormData();
    formData.append('avatar', imageFile);
    
    const response = await apiClient.upload('/users/avatar', formData);
    return response.data;
  },
};

/**
 * Categories API endpoints
 */
export const categoriesAPI = {
  async getCategories() {
    const response = await apiClient.get(API_ENDPOINTS.categories.list);
    return response.data;
  },

  async getCategoryRecipes(id, params = {}) {
    const response = await apiClient.get(
      API_ENDPOINTS.categories.recipes(id),
      params
    );
    return response.data;
  },
};

/**
 * Generic API utilities
 */
export const apiUtils = {
  /**
   * Handle API errors globally
   */
  handleError(error) {
    if (error instanceof APIError) {
      switch (error.status) {
        case 401:
          // Redirect to login
          storage.remove(AUTH_TOKEN_KEY);
          window.location.href = '/login';
          break;
        case 403:
          console.error('Access forbidden:', error.message);
          break;
        case 404:
          console.error('Resource not found:', error.message);
          break;
        case 500:
          console.error('Server error:', error.message);
          break;
        default:
          console.error('API error:', error.message);
      }
    } else {
      console.error('Unexpected error:', error);
    }
    
    throw error;
  },

  /**
   * Retry failed requests
   */
  async retry(apiCall, maxRetries = 3, delay = 1000) {
    let lastError;
    
    for (let i = 0; i <= maxRetries; i++) {
      try {
        return await apiCall();
      } catch (error) {
        lastError = error;
        
        // Don't retry client errors (4xx)
        if (error instanceof APIError && error.isClientError) {
          throw error;
        }
        
        // Don't retry on last attempt
        if (i === maxRetries) {
          break;
        }
        
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
      }
    }
    
    throw lastError;
  },

  /**
   * Create cancellable request
   */
  createCancellableRequest(apiCall) {
    const controller = new AbortController();
    
    const request = apiCall({ signal: controller.signal });
    const cancel = () => controller.abort();
    
    return { request, cancel };
  },
};

// Export API client and error class
export { apiClient, APIError };
export default apiClient;