/**
 * Mock data for development and testing
 * This file provides sample data for recipes, users, categories, etc.
 */

import { formatDate } from '../utils/formatters';

// Mock Users
export const mockUsers = [
  {
    id: 1,
    username: 'marcorossi',
    name: 'Marco Rossi',
    email: 'marco.rossi@email.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
    bio: 'Professional chef from Rome with 15+ years of experience in traditional Italian cuisine. Passionate about sharing authentic recipes.',
    location: 'Rome, Italy',
    website: 'https://marcorossi-chef.com',
    social: {
      instagram: '@marcorossi_chef',
      twitter: '@marcorossi'
    },
    stats: {
      recipes: 45,
      followers: 12500,
      following: 287,
      likes: 25600
    },
    verified: true,
    joinedAt: '2023-03-15T10:30:00Z',
    lastActiveAt: '2024-11-06T08:15:00Z'
  },
  {
    id: 2,
    username: 'sarahjohnson',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200',
    bio: 'Home cook and food blogger. Love experimenting with healthy recipes and sharing family traditions.',
    location: 'San Francisco, CA',
    website: 'https://sarahcooks.blog',
    social: {
      instagram: '@sarahcooks',
      youtube: 'SarahCooksChannel'
    },
    stats: {
      recipes: 32,
      followers: 8750,
      following: 456,
      likes: 18900
    },
    verified: false,
    joinedAt: '2023-06-22T14:20:00Z',
    lastActiveAt: '2024-11-06T07:45:00Z'
  },
  {
    id: 3,
    username: 'chefantoine',
    name: 'Chef Antoine Dubois',
    email: 'antoine.dubois@email.com',
    avatar: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=200',
    bio: 'French pastry chef specializing in desserts and baked goods. Winner of multiple culinary competitions.',
    location: 'Paris, France',
    website: 'https://antoinepatisserie.fr',
    social: {
      instagram: '@chefantoine',
      facebook: 'ChefAntoineDubois'
    },
    stats: {
      recipes: 67,
      followers: 18500,
      following: 123,
      likes: 42800
    },
    verified: true,
    joinedAt: '2023-01-10T09:15:00Z',
    lastActiveAt: '2024-11-06T06:30:00Z'
  }
];

// Mock Categories
export const mockCategories = [
  {
    id: 'main-courses',
    name: 'Main Courses',
    slug: 'main-courses',
    icon: '🍽️',
    color: 'orange',
    description: 'Hearty dishes for lunch and dinner',
    recipeCount: 145,
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400'
  },
  {
    id: 'appetizers',
    name: 'Appetizers',
    slug: 'appetizers',
    icon: '🥗',
    color: 'green',
    description: 'Perfect starters for any meal',
    recipeCount: 67,
    imageUrl: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400'
  },
  {
    id: 'desserts',
    name: 'Desserts',
    slug: 'desserts',
    icon: '🍰',
    color: 'purple',
    description: 'Sweet treats and delightful endings',
    recipeCount: 89,
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400'
  },
  {
    id: 'beverages',
    name: 'Beverages',
    slug: 'beverages',
    icon: '🥤',
    color: 'blue',
    description: 'Refreshing drinks and cocktails',
    recipeCount: 34,
    imageUrl: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400'
  },
  {
    id: 'vegetarian',
    name: 'Vegetarian',
    slug: 'vegetarian',
    icon: '🥕',
    color: 'green',
    description: 'Plant-based meals full of flavor',
    recipeCount: 112,
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400'
  }
];

// Mock Recipes
export const mockRecipes = [
  {
    id: 1,
    title: 'Classic Margherita Pizza',
    slug: 'classic-margherita-pizza',
    description: 'Traditional Italian pizza with fresh mozzarella, tomatoes, and basil.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800',
    category: 'main-courses',
    difficulty: 'easy',
    prepTime: '20 min',
    cookTime: '15 min',
    totalTime: '35 min',
    servings: 4,
    rating: 4.8,
    reviewCount: 156,
    ingredients: [
      { amount: '1', unit: 'lb', name: 'pizza dough' },
      { amount: '1/2', unit: 'cup', name: 'pizza sauce' },
      { amount: '8', unit: 'oz', name: 'fresh mozzarella, sliced' },
      { amount: '2', unit: 'large', name: 'tomatoes, sliced' },
      { amount: '1/4', unit: 'cup', name: 'fresh basil leaves' }
    ],
    instructions: [
      'Preheat oven to 475°F (245°C).',
      'Roll out pizza dough on a floured surface.',
      'Spread pizza sauce evenly over dough.',
      'Add mozzarella and tomato slices.',
      'Bake for 12-15 minutes until crust is golden.',
      'Top with fresh basil and serve.'
    ],
    nutrition: {
      calories: 320,
      protein: '16g',
      carbs: '38g',
      fat: '12g'
    },
    tags: ['italian', 'pizza', 'vegetarian', 'quick'],
    author: mockUsers[0],
    createdAt: '2024-01-15T10:30:00Z',
    featured: true
  },
  {
    id: 2,
    title: 'Hearty Chicken Noodle Soup',
    slug: 'hearty-chicken-noodle-soup',
    description: 'Comforting homemade soup perfect for cold days.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800',
    category: 'main-courses',
    difficulty: 'medium',
    prepTime: '15 min',
    cookTime: '45 min',
    totalTime: '60 min',
    servings: 6,
    rating: 4.5,
    reviewCount: 89,
    ingredients: [
      { amount: '1', unit: 'lb', name: 'chicken breast, diced' },
      { amount: '8', unit: 'cups', name: 'chicken broth' },
      { amount: '2', unit: 'cups', name: 'egg noodles' },
      { amount: '2', unit: 'large', name: 'carrots, diced' },
      { amount: '2', unit: 'stalks', name: 'celery, diced' }
    ],
    instructions: [
      'Heat oil in a large pot over medium heat.',
      'Cook chicken until no longer pink.',
      'Add vegetables and cook until tender.',
      'Pour in broth and bring to boil.',
      'Add noodles and cook until tender.',
      'Season with salt and pepper to taste.'
    ],
    nutrition: {
      calories: 280,
      protein: '22g',
      carbs: '24g',
      fat: '8g'
    },
    tags: ['comfort-food', 'soup', 'chicken', 'healthy'],
    author: mockUsers[1],
    createdAt: '2024-01-10T14:20:00Z',
    featured: false
  },
  {
    id: 3,
    title: 'Molten Chocolate Lava Cake',
    slug: 'molten-chocolate-lava-cake',
    description: 'Rich, decadent dessert with a molten chocolate center.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800',
    category: 'desserts',
    difficulty: 'medium',
    prepTime: '15 min',
    cookTime: '12 min',
    totalTime: '27 min',
    servings: 4,
    rating: 4.7,
    reviewCount: 234,
    ingredients: [
      { amount: '4', unit: 'oz', name: 'dark chocolate, chopped' },
      { amount: '4', unit: 'tbsp', name: 'unsalted butter' },
      { amount: '2', unit: 'large', name: 'eggs' },
      { amount: '2', unit: 'large', name: 'egg yolks' },
      { amount: '1/4', unit: 'cup', name: 'granulated sugar' }
    ],
    instructions: [
      'Preheat oven to 425°F (220°C).',
      'Butter four 6-ounce ramekins.',
      'Melt chocolate and butter in double boiler.',
      'Whisk eggs, egg yolks, and sugar until thick.',
      'Fold in melted chocolate mixture.',
      'Divide batter among ramekins and bake 10-12 minutes.'
    ],
    nutrition: {
      calories: 380,
      protein: '8g',
      carbs: '32g',
      fat: '26g'
    },
    tags: ['chocolate', 'dessert', 'elegant', 'date-night'],
    author: mockUsers[2],
    createdAt: '2024-01-08T16:45:00Z',
    featured: true
  }
];

// Export utility functions for mock data
export const mockDataUtils = {
  getUserById: (id) => mockUsers.find(user => user.id === parseInt(id)),
  getRecipeById: (identifier) => 
    mockRecipes.find(recipe => 
      recipe.id === parseInt(identifier) || recipe.slug === identifier
    ),
  getRecipesByCategory: (categoryId) =>
    mockRecipes.filter(recipe => recipe.category === categoryId),
  getRecipesByAuthor: (authorId) =>
    mockRecipes.filter(recipe => recipe.author.id === parseInt(authorId)),
  getPopularRecipes: (limit = 10) =>
    mockRecipes
      .sort((a, b) => (b.rating * b.reviewCount) - (a.rating * a.reviewCount))
      .slice(0, limit),
  getFeaturedRecipes: () => mockRecipes.filter(recipe => recipe.featured),
  searchRecipes: (query) => {
    const lowerQuery = query.toLowerCase();
    return mockRecipes.filter(recipe =>
      recipe.title.toLowerCase().includes(lowerQuery) ||
      recipe.description.toLowerCase().includes(lowerQuery) ||
      recipe.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  },
  filterRecipes: (filters = {}) => {
    let filtered = [...mockRecipes];

    if (filters.category) {
      filtered = filtered.filter(recipe => recipe.category === filters.category);
    }
    if (filters.difficulty) {
      filtered = filtered.filter(recipe => recipe.difficulty === filters.difficulty);
    }
    if (filters.minRating) {
      filtered = filtered.filter(recipe => recipe.rating >= filters.minRating);
    }

    // Sort results
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'newest':
          filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'alphabetical':
          filtered.sort((a, b) => a.title.localeCompare(b.title));
          break;
        default:
          filtered.sort((a, b) => (b.rating * b.reviewCount) - (a.rating * a.reviewCount));
      }
    }

    return filtered;
  },
  paginate: (items, page = 1, limit = 12) => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedItems = items.slice(startIndex, endIndex);
    
    return {
      items: paginatedItems,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: items.length,
        totalPages: Math.ceil(items.length / limit),
        hasNext: endIndex < items.length,
        hasPrev: page > 1
      }
    };
  }
};

// Additional mock data
export const mockNotifications = [
  {
    id: 1,
    type: 'like',
    message: 'Marco Rossi liked your recipe',
    fromUser: mockUsers[0],
    read: false,
    createdAt: '2024-11-06T08:15:00Z'
  }
];

export const mockTags = [
  { name: 'italian', count: 23, trending: true },
  { name: 'vegetarian', count: 45, trending: false },
  { name: 'quick', count: 32, trending: true },
  { name: 'healthy', count: 38, trending: false }
];

// Simulate API response delays
export const simulateApiDelay = (ms = 800) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Mock API response wrapper
export const createMockApiResponse = (data, status = 200) => ({
  data,
  status,
  message: status === 200 ? 'Success' : 'Error',
  timestamp: new Date().toISOString()
});

export default {
  users: mockUsers,
  recipes: mockRecipes,
  categories: mockCategories,
  notifications: mockNotifications,
  tags: mockTags,
  utils: mockDataUtils,
  simulateApiDelay,
  createMockApiResponse
};