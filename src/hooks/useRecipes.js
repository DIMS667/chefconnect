import { useState, useEffect, useCallback } from 'react';
import { storage, STORAGE_KEYS } from '../utils';

// Mock data
const mockRecipes = [
  {
    id: 1,
    title: 'Classic Margherita Pizza',
    slug: 'classic-margherita-pizza',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600',
    rating: 4.8,
    reviewCount: 156,
    category: 'main-courses',
    difficulty: 'easy',
    prepTime: '20 min',
    cookTime: '15 min',
    totalTime: '35 min',
    servings: 4,
    description: 'Traditional Italian pizza with fresh mozzarella, tomatoes, and basil.',
    ingredients: [
      { amount: '1', unit: 'lb', name: 'pizza dough' },
      { amount: '1/2', unit: 'cup', name: 'pizza sauce' },
      { amount: '8', unit: 'oz', name: 'fresh mozzarella, sliced' },
      { amount: '2', unit: '', name: 'tomatoes, sliced' },
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
    author: {
      id: 1,
      name: 'Marco Rossi',
      username: 'marcorossi',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
    },
    tags: ['italian', 'pizza', 'vegetarian', 'quick'],
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    title: 'Hearty Chicken Noodle Soup',
    slug: 'hearty-chicken-noodle-soup',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600',
    rating: 4.5,
    reviewCount: 89,
    category: 'main-courses',
    difficulty: 'medium',
    prepTime: '15 min',
    cookTime: '45 min',
    totalTime: '60 min',
    servings: 6,
    description: 'Comforting homemade soup perfect for cold days.',
    ingredients: [
      { amount: '1', unit: 'lb', name: 'chicken breast, diced' },
      { amount: '8', unit: 'cups', name: 'chicken broth' },
      { amount: '2', unit: 'cups', name: 'egg noodles' },
      { amount: '2', unit: '', name: 'carrots, diced' },
      { amount: '2', unit: '', name: 'celery stalks, diced' }
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
    author: {
      id: 2,
      name: 'Sarah Johnson',
      username: 'sarahjohnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100'
    },
    tags: ['comfort-food', 'soup', 'chicken', 'healthy'],
    createdAt: '2024-01-10T14:20:00Z',
    updatedAt: '2024-01-10T14:20:00Z'
  }
  // Add more mock recipes as needed...
];

export const useRecipes = (options = {}) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0
  });

  // Fetch recipes with filters
  const fetchRecipes = useCallback(async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));

      let filteredRecipes = [...mockRecipes];

      // Apply filters
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredRecipes = filteredRecipes.filter(recipe =>
          recipe.title.toLowerCase().includes(searchLower) ||
          recipe.description.toLowerCase().includes(searchLower) ||
          recipe.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
      }

      if (filters.category) {
        filteredRecipes = filteredRecipes.filter(recipe =>
          recipe.category === filters.category
        );
      }

      if (filters.difficulty) {
        filteredRecipes = filteredRecipes.filter(recipe =>
          recipe.difficulty === filters.difficulty
        );
      }

      if (filters.tags && filters.tags.length > 0) {
        filteredRecipes = filteredRecipes.filter(recipe =>
          filters.tags.some(tag => recipe.tags.includes(tag))
        );
      }

      // Apply sorting
      if (filters.sortBy) {
        switch (filters.sortBy) {
          case 'newest':
            filteredRecipes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            break;
          case 'oldest':
            filteredRecipes.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            break;
          case 'rating':
            filteredRecipes.sort((a, b) => b.rating - a.rating);
            break;
          case 'alphabetical':
            filteredRecipes.sort((a, b) => a.title.localeCompare(b.title));
            break;
          case 'prep-time':
            filteredRecipes.sort((a, b) => {
              const aTime = parseInt(a.prepTime);
              const bTime = parseInt(b.prepTime);
              return aTime - bTime;
            });
            break;
          default:
            // Popular (default)
            filteredRecipes.sort((a, b) => (b.rating * b.reviewCount) - (a.rating * a.reviewCount));
        }
      }

      // Apply pagination
      const page = filters.page || 1;
      const limit = filters.limit || 12;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedRecipes = filteredRecipes.slice(startIndex, endIndex);

      setRecipes(paginatedRecipes);
      setPagination({
        page,
        limit,
        total: filteredRecipes.length,
        totalPages: Math.ceil(filteredRecipes.length / limit)
      });

    } catch (err) {
      setError(err.message || 'Failed to fetch recipes');
    } finally {
      setLoading(false);
    }
  }, []);

  // Get single recipe by ID or slug
  const fetchRecipe = useCallback(async (identifier) => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 600));

      const recipe = mockRecipes.find(r => 
        r.id.toString() === identifier || r.slug === identifier
      );

      if (!recipe) {
        throw new Error('Recipe not found');
      }

      return recipe;
    } catch (err) {
      setError(err.message || 'Failed to fetch recipe');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get popular recipes
  const fetchPopularRecipes = useCallback(async (limit = 6) => {
    try {
      setLoading(true);
      setError(null);

      await new Promise(resolve => setTimeout(resolve, 500));

      const popularRecipes = [...mockRecipes]
        .sort((a, b) => (b.rating * b.reviewCount) - (a.rating * a.reviewCount))
        .slice(0, limit);

      return popularRecipes;
    } catch (err) {
      setError(err.message || 'Failed to fetch popular recipes');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Search recipes
  const searchRecipes = useCallback(async (query, filters = {}) => {
    return fetchRecipes({ ...filters, search: query });
  }, [fetchRecipes]);

  // Get recipes by author
  const fetchRecipesByAuthor = useCallback(async (authorId) => {
    try {
      setLoading(true);
      setError(null);

      await new Promise(resolve => setTimeout(resolve, 600));

      const authorRecipes = mockRecipes.filter(recipe => 
        recipe.author.id.toString() === authorId.toString()
      );

      setRecipes(authorRecipes);
      return authorRecipes;
    } catch (err) {
      setError(err.message || 'Failed to fetch author recipes');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    // State
    recipes,
    loading,
    error,
    pagination,

    // Actions
    fetchRecipes,
    fetchRecipe,
    fetchPopularRecipes,
    searchRecipes,
    fetchRecipesByAuthor
  };
};

// Hook for managing user's favorite recipes
export const useFavoriteRecipes = () => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const stored = storage.get(STORAGE_KEYS.favorites, []);
    setFavorites(stored);
  }, []);

  // Save favorites to localStorage
  const saveFavorites = (newFavorites) => {
    setFavorites(newFavorites);
    storage.set(STORAGE_KEYS.favorites, newFavorites);
  };

  const addToFavorites = (recipe) => {
    const newFavorites = [...favorites];
    const existingIndex = newFavorites.findIndex(fav => fav.id === recipe.id);
    
    if (existingIndex === -1) {
      newFavorites.push({
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        rating: recipe.rating,
        author: recipe.author,
        addedAt: new Date().toISOString()
      });
      saveFavorites(newFavorites);
      return true;
    }
    return false;
  };

  const removeFromFavorites = (recipeId) => {
    const newFavorites = favorites.filter(fav => fav.id !== recipeId);
    saveFavorites(newFavorites);
    return true;
  };

  const isFavorite = (recipeId) => {
    return favorites.some(fav => fav.id === recipeId);
  };

  const toggleFavorite = (recipe) => {
    if (isFavorite(recipe.id)) {
      removeFromFavorites(recipe.id);
      return false;
    } else {
      addToFavorites(recipe);
      return true;
    }
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
    favoritesCount: favorites.length
  };
};

// Hook for recipe creation/editing
export const useRecipeForm = (initialData = null) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    difficulty: 'easy',
    prepTime: '',
    cookTime: '',
    servings: 4,
    image: '',
    ingredients: [{ amount: '', unit: '', name: '' }],
    instructions: [''],
    tags: [],
    ...initialData
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addIngredient = () => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, { amount: '', unit: '', name: '' }]
    }));
  };

  const updateIngredient = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.map((ingredient, i) =>
        i === index ? { ...ingredient, [field]: value } : ingredient
      )
    }));
  };

  const removeIngredient = (index) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }));
  };

  const addInstruction = () => {
    setFormData(prev => ({
      ...prev,
      instructions: [...prev.instructions, '']
    }));
  };

  const updateInstruction = (index, value) => {
    setFormData(prev => ({
      ...prev,
      instructions: prev.instructions.map((instruction, i) =>
        i === index ? value : instruction
      )
    }));
  };

  const removeInstruction = (index) => {
    setFormData(prev => ({
      ...prev,
      instructions: prev.instructions.filter((_, i) => i !== index)
    }));
  };

  const saveRecipe = async (isUpdate = false) => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Validate form data
      if (!formData.title.trim()) {
        throw new Error('Recipe title is required');
      }

      // In a real app, this would make an API call
      const savedRecipe = {
        ...formData,
        id: isUpdate ? formData.id : Date.now(),
        slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        rating: formData.rating || 0,
        reviewCount: formData.reviewCount || 0,
        createdAt: formData.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      return { success: true, recipe: savedRecipe };
    } catch (err) {
      setError(err.message || 'Failed to save recipe');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    error,
    updateField,
    addIngredient,
    updateIngredient,
    removeIngredient,
    addInstruction,
    updateInstruction,
    removeInstruction,
    saveRecipe
  };
};

export default useRecipes;