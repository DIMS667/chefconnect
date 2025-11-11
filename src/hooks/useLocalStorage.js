import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for localStorage management with JSON serialization
 * @param {string} key - The localStorage key
 * @param {*} initialValue - Initial value if key doesn't exist
 * @returns {[value, setValue, removeValue]}
 */
export const useLocalStorage = (key, initialValue) => {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = useCallback((value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  // Function to remove the value from localStorage
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Listen for changes to the localStorage key from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error(`Error parsing localStorage change for key "${key}":`, error);
        }
      } else if (e.key === key && e.newValue === null) {
        setStoredValue(initialValue);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
};

/**
 * Hook for managing user preferences in localStorage
 */
export const useUserPreferences = () => {
  const [preferences, setPreferences] = useLocalStorage('chefconnect_preferences', {
    theme: 'light',
    language: 'en',
    notifications: {
      email: true,
      push: false,
      newRecipes: true,
      followers: true,
      comments: true
    },
    display: {
      recipesPerPage: 12,
      showNutritionInfo: true,
      showDifficulty: true,
      defaultView: 'grid'
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
      allowMessages: true
    }
  });

  const updatePreference = useCallback((path, value) => {
    setPreferences(prev => {
      const newPrefs = { ...prev };
      
      // Handle nested paths like "notifications.email"
      const keys = path.split('.');
      let current = newPrefs;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newPrefs;
    });
  }, [setPreferences]);

  const getPreference = useCallback((path, defaultValue = null) => {
    const keys = path.split('.');
    let current = preferences;
    
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return defaultValue;
      }
    }
    
    return current;
  }, [preferences]);

  const resetPreferences = useCallback(() => {
    setPreferences({
      theme: 'light',
      language: 'en',
      notifications: {
        email: true,
        push: false,
        newRecipes: true,
        followers: true,
        comments: true
      },
      display: {
        recipesPerPage: 12,
        showNutritionInfo: true,
        showDifficulty: true,
        defaultView: 'grid'
      },
      privacy: {
        profileVisibility: 'public',
        showEmail: false,
        allowMessages: true
      }
    });
  }, [setPreferences]);

  return {
    preferences,
    updatePreference,
    getPreference,
    resetPreferences
  };
};

/**
 * Hook for managing search history
 */
export const useSearchHistory = (maxItems = 10) => {
  const [searchHistory, setSearchHistory] = useLocalStorage('chefconnect_search_history', []);

  const addSearch = useCallback((query) => {
    if (!query || !query.trim()) return;
    
    setSearchHistory(prev => {
      const trimmedQuery = query.trim();
      const filtered = prev.filter(item => item.toLowerCase() !== trimmedQuery.toLowerCase());
      const newHistory = [trimmedQuery, ...filtered];
      
      // Limit the number of items
      return newHistory.slice(0, maxItems);
    });
  }, [setSearchHistory, maxItems]);

  const removeSearch = useCallback((query) => {
    setSearchHistory(prev => prev.filter(item => item !== query));
  }, [setSearchHistory]);

  const clearHistory = useCallback(() => {
    setSearchHistory([]);
  }, [setSearchHistory]);

  return {
    searchHistory,
    addSearch,
    removeSearch,
    clearHistory
  };
};

/**
 * Hook for managing recently viewed recipes
 */
export const useRecentlyViewed = (maxItems = 20) => {
  const [recentlyViewed, setRecentlyViewed] = useLocalStorage('chefconnect_recently_viewed', []);

  const addRecipe = useCallback((recipe) => {
    if (!recipe || !recipe.id) return;

    setRecentlyViewed(prev => {
      const filtered = prev.filter(item => item.id !== recipe.id);
      const recipeData = {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        rating: recipe.rating,
        author: recipe.author,
        viewedAt: new Date().toISOString()
      };
      
      const newList = [recipeData, ...filtered];
      return newList.slice(0, maxItems);
    });
  }, [setRecentlyViewed, maxItems]);

  const removeRecipe = useCallback((recipeId) => {
    setRecentlyViewed(prev => prev.filter(item => item.id !== recipeId));
  }, [setRecentlyViewed]);

  const clearHistory = useCallback(() => {
    setRecentlyViewed([]);
  }, [setRecentlyViewed]);

  return {
    recentlyViewed,
    addRecipe,
    removeRecipe,
    clearHistory
  };
};

/**
 * Hook for managing shopping list
 */
export const useShoppingList = () => {
  const [shoppingList, setShoppingList] = useLocalStorage('chefconnect_shopping_list', []);

  const addItem = useCallback((item) => {
    if (!item || !item.name) return;

    setShoppingList(prev => {
      const newItem = {
        id: Date.now() + Math.random(),
        name: item.name,
        amount: item.amount || '',
        unit: item.unit || '',
        category: item.category || 'other',
        completed: false,
        addedAt: new Date().toISOString(),
        recipeId: item.recipeId || null,
        recipeTitle: item.recipeTitle || null
      };
      
      return [...prev, newItem];
    });
  }, [setShoppingList]);

  const removeItem = useCallback((itemId) => {
    setShoppingList(prev => prev.filter(item => item.id !== itemId));
  }, [setShoppingList]);

  const toggleCompleted = useCallback((itemId) => {
    setShoppingList(prev => prev.map(item =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    ));
  }, [setShoppingList]);

  const updateItem = useCallback((itemId, updates) => {
    setShoppingList(prev => prev.map(item =>
      item.id === itemId ? { ...item, ...updates } : item
    ));
  }, [setShoppingList]);

  const addRecipeIngredients = useCallback((recipe) => {
    if (!recipe || !recipe.ingredients) return;

    const newItems = recipe.ingredients.map(ingredient => ({
      id: Date.now() + Math.random(),
      name: ingredient.name,
      amount: ingredient.amount || '',
      unit: ingredient.unit || '',
      category: 'ingredient',
      completed: false,
      addedAt: new Date().toISOString(),
      recipeId: recipe.id,
      recipeTitle: recipe.title
    }));

    setShoppingList(prev => [...prev, ...newItems]);
  }, [setShoppingList]);

  const clearCompleted = useCallback(() => {
    setShoppingList(prev => prev.filter(item => !item.completed));
  }, [setShoppingList]);

  const clearAll = useCallback(() => {
    setShoppingList([]);
  }, [setShoppingList]);

  const getItemsByCategory = useCallback(() => {
    const categories = {
      produce: [],
      dairy: [],
      meat: [],
      pantry: [],
      other: []
    };

    shoppingList.forEach(item => {
      const category = item.category || 'other';
      if (categories[category]) {
        categories[category].push(item);
      } else {
        categories.other.push(item);
      }
    });

    return categories;
  }, [shoppingList]);

  return {
    shoppingList,
    addItem,
    removeItem,
    toggleCompleted,
    updateItem,
    addRecipeIngredients,
    clearCompleted,
    clearAll,
    getItemsByCategory,
    itemCount: shoppingList.length,
    completedCount: shoppingList.filter(item => item.completed).length
  };
};

/**
 * Hook for managing meal planning
 */
export const useMealPlan = () => {
  const [mealPlan, setMealPlan] = useLocalStorage('chefconnect_meal_plan', {});

  const addMeal = useCallback((date, mealType, recipe) => {
    setMealPlan(prev => {
      const dateKey = new Date(date).toISOString().split('T')[0];
      
      return {
        ...prev,
        [dateKey]: {
          ...prev[dateKey],
          [mealType]: {
            id: recipe.id,
            title: recipe.title,
            image: recipe.image,
            prepTime: recipe.prepTime,
            servings: recipe.servings,
            addedAt: new Date().toISOString()
          }
        }
      };
    });
  }, [setMealPlan]);

  const removeMeal = useCallback((date, mealType) => {
    setMealPlan(prev => {
      const dateKey = new Date(date).toISOString().split('T')[0];
      const dayPlan = { ...prev[dateKey] };
      
      delete dayPlan[mealType];
      
      // If no meals left for this day, remove the day entirely
      if (Object.keys(dayPlan).length === 0) {
        const newPlan = { ...prev };
        delete newPlan[dateKey];
        return newPlan;
      }
      
      return {
        ...prev,
        [dateKey]: dayPlan
      };
    });
  }, [setMealPlan]);

  const getMealsForDate = useCallback((date) => {
    const dateKey = new Date(date).toISOString().split('T')[0];
    return mealPlan[dateKey] || {};
  }, [mealPlan]);

  const getMealsForWeek = useCallback((startDate) => {
    const week = {};
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const dateKey = date.toISOString().split('T')[0];
      week[dateKey] = mealPlan[dateKey] || {};
    }
    
    return week;
  }, [mealPlan]);

  const clearMealPlan = useCallback(() => {
    setMealPlan({});
  }, [setMealPlan]);

  return {
    mealPlan,
    addMeal,
    removeMeal,
    getMealsForDate,
    getMealsForWeek,
    clearMealPlan
  };
};

/**
 * Hook for managing app settings
 */
export const useAppSettings = () => {
  const [settings, setSettings] = useLocalStorage('chefconnect_settings', {
    theme: 'light',
    language: 'en',
    units: 'metric', // metric or imperial
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    autoSave: true,
    compactMode: false,
    animations: true
  });

  const updateSetting = useCallback((key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  }, [setSettings]);

  const resetSettings = useCallback(() => {
    setSettings({
      theme: 'light',
      language: 'en',
      units: 'metric',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      autoSave: true,
      compactMode: false,
      animations: true
    });
  }, [setSettings]);

  return {
    settings,
    updateSetting,
    resetSettings
  };
};

export default useLocalStorage;