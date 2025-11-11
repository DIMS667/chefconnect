// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    profile: '/auth/profile'
  },
  recipes: {
    list: '/recipes',
    detail: (id) => `/recipes/${id}`,
    create: '/recipes',
    update: (id) => `/recipes/${id}`,
    delete: (id) => `/recipes/${id}`,
    search: '/recipes/search',
    popular: '/recipes/popular'
  },
  users: {
    profile: (id) => `/users/${id}`,
    recipes: (id) => `/users/${id}/recipes`,
    favorites: (id) => `/users/${id}/favorites`,
    follow: (id) => `/users/${id}/follow`
  },
  categories: {
    list: '/categories',
    recipes: (id) => `/categories/${id}/recipes`
  }
};

// App Configuration
export const APP_CONFIG = {
  name: 'ChefConnect',
  version: '1.0.0',
  description: 'Connect with chefs worldwide and discover amazing recipes',
  url: process.env.REACT_APP_URL || 'http://localhost:3000'
};

// Authentication
export const AUTH_TOKEN_KEY = 'chefconnect_token';
export const AUTH_USER_KEY = 'chefconnect_user';

// UI Constants
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

export const COLORS = {
  primary: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316', // Main orange
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12'
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827'
  }
};

// Recipe Categories
export const RECIPE_CATEGORIES = [
  {
    id: 'main-courses',
    name: 'Main Courses',
    icon: '🍽️',
    color: 'orange',
    description: 'Hearty dishes for lunch and dinner'
  },
  {
    id: 'appetizers',
    name: 'Appetizers',
    icon: '🥗',
    color: 'green',
    description: 'Perfect starters for any meal'
  },
  {
    id: 'desserts',
    name: 'Desserts',
    icon: '🍰',
    color: 'purple',
    description: 'Sweet treats and delightful endings'
  },
  {
    id: 'beverages',
    name: 'Beverages',
    icon: '🥤',
    color: 'blue',
    description: 'Refreshing drinks and cocktails'
  },
  {
    id: 'vegetarian',
    name: 'Vegetarian',
    icon: '🥕',
    color: 'green',
    description: 'Plant-based meals full of flavor'
  },
  {
    id: 'vegan',
    name: 'Vegan',
    icon: '🌱',
    color: 'green',
    description: 'Completely plant-based recipes'
  },
  {
    id: 'gluten-free',
    name: 'Gluten-Free',
    icon: '🌾',
    color: 'blue',
    description: 'Safe options for gluten sensitivity'
  },
  {
    id: 'quick-easy',
    name: 'Quick & Easy',
    icon: '⚡',
    color: 'red',
    description: 'Ready in 30 minutes or less'
  }
];

// Difficulty Levels
export const DIFFICULTY_LEVELS = [
  { value: 'easy', label: 'Easy', color: 'green' },
  { value: 'medium', label: 'Medium', color: 'yellow' },
  { value: 'hard', label: 'Hard', color: 'red' },
  { value: 'expert', label: 'Expert', color: 'purple' }
];

// Sort Options
export const SORT_OPTIONS = {
  recipes: [
    { value: 'popular', label: 'Most Popular' },
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'prep-time', label: 'Quick & Easy' },
    { value: 'alphabetical', label: 'A-Z' }
  ],
  users: [
    { value: 'newest', label: 'Newest Members' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'active', label: 'Most Active' },
    { value: 'alphabetical', label: 'A-Z' }
  ]
};

// Time Ranges
export const TIME_RANGES = [
  { value: '0-15', label: 'Under 15 min' },
  { value: '15-30', label: '15-30 min' },
  { value: '30-60', label: '30-60 min' },
  { value: '60-120', label: '1-2 hours' },
  { value: '120+', label: 'Over 2 hours' }
];

// Serving Sizes
export const SERVING_SIZES = [
  { value: '1', label: '1 person' },
  { value: '2', label: '2 people' },
  { value: '4', label: '4 people' },
  { value: '6', label: '6 people' },
  { value: '8', label: '8+ people' }
];

// Validation Rules
export const VALIDATION_RULES = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address'
  },
  password: {
    minLength: 6,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    message: 'Password must be at least 6 characters with uppercase, lowercase, and number'
  },
  username: {
    minLength: 3,
    maxLength: 30,
    pattern: /^[a-zA-Z0-9_-]+$/,
    message: 'Username must be 3-30 characters, letters, numbers, underscore, or dash only'
  },
  recipeName: {
    minLength: 3,
    maxLength: 100,
    message: 'Recipe name must be between 3-100 characters'
  }
};

// File Upload
export const FILE_UPLOAD = {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  allowedExtensions: ['.jpg', '.jpeg', '.png', '.webp']
};

// Pagination
export const PAGINATION = {
  defaultPageSize: 12,
  pageSizeOptions: [6, 12, 24, 48],
  maxVisiblePages: 5
};

// Local Storage Keys
export const STORAGE_KEYS = {
  theme: 'chefconnect_theme',
  language: 'chefconnect_language',
  favorites: 'chefconnect_favorites',
  recentSearches: 'chefconnect_recent_searches',
  userPreferences: 'chefconnect_user_preferences'
};

// Social Media
export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/chefconnect',
  facebook: 'https://facebook.com/chefconnect',
  instagram: 'https://instagram.com/chefconnect',
  youtube: 'https://youtube.com/chefconnect'
};

// Error Messages
export const ERROR_MESSAGES = {
  general: 'Something went wrong. Please try again.',
  network: 'Network error. Please check your connection.',
  auth: {
    invalidCredentials: 'Invalid email or password.',
    userExists: 'An account with this email already exists.',
    userNotFound: 'No account found with this email.',
    sessionExpired: 'Your session has expired. Please login again.'
  },
  validation: {
    required: 'This field is required.',
    email: 'Please enter a valid email address.',
    minLength: (min) => `Must be at least ${min} characters.`,
    maxLength: (max) => `Must be no more than ${max} characters.`,
    match: 'Passwords do not match.'
  }
};

// Success Messages
export const SUCCESS_MESSAGES = {
  general: 'Operation completed successfully!',
  auth: {
    login: 'Welcome back!',
    register: 'Account created successfully!',
    logout: 'Logged out successfully.',
    passwordReset: 'Password reset instructions sent to your email.'
  },
  recipe: {
    created: 'Recipe created successfully!',
    updated: 'Recipe updated successfully!',
    deleted: 'Recipe deleted successfully.',
    favorited: 'Recipe added to favorites!',
    unfavorited: 'Recipe removed from favorites.'
  },
  profile: {
    updated: 'Profile updated successfully!',
    followed: 'User followed successfully!',
    unfollowed: 'User unfollowed successfully.'
  }
};

// Feature Flags
export const FEATURE_FLAGS = {
  enableComments: true,
  enableRatings: true,
  enableSocialShare: true,
  enableNotifications: false,
  enableMessaging: false,
  enableVideoRecipes: false
};

export default {
  API_BASE_URL,
  API_ENDPOINTS,
  APP_CONFIG,
  AUTH_TOKEN_KEY,
  AUTH_USER_KEY,
  BREAKPOINTS,
  COLORS,
  RECIPE_CATEGORIES,
  DIFFICULTY_LEVELS,
  SORT_OPTIONS,
  TIME_RANGES,
  SERVING_SIZES,
  VALIDATION_RULES,
  FILE_UPLOAD,
  PAGINATION,
  STORAGE_KEYS,
  SOCIAL_LINKS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  FEATURE_FLAGS
};