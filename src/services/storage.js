/**
 * Enhanced localStorage service with error handling and type safety
 */

/**
 * Storage service class for managing localStorage operations
 */
class StorageService {
  constructor() {
    this.isSupported = this.checkSupport();
  }

  /**
   * Check if localStorage is supported and available
   */
  checkSupport() {
    try {
      if (typeof window === 'undefined') return false;
      
      const testKey = '__localStorage_test__';
      window.localStorage.setItem(testKey, 'test');
      window.localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      console.warn('localStorage is not available:', e.message);
      return false;
    }
  }

  /**
   * Get item from localStorage with JSON parsing
   * @param {string} key - Storage key
   * @param {any} defaultValue - Default value if key doesn't exist
   * @returns {any} Parsed value or default value
   */
  get(key, defaultValue = null) {
    if (!this.isSupported) return defaultValue;

    try {
      const item = window.localStorage.getItem(key);
      if (item === null) return defaultValue;
      
      // Try to parse JSON, fallback to string if it fails
      try {
        return JSON.parse(item);
      } catch (parseError) {
        // If JSON parsing fails, return the raw string
        return item;
      }
    } catch (error) {
      console.error(`Error getting localStorage key "${key}":`, error);
      return defaultValue;
    }
  }

  /**
   * Set item in localStorage with JSON stringification
   * @param {string} key - Storage key
   * @param {any} value - Value to store
   * @returns {boolean} Success status
   */
  set(key, value) {
    if (!this.isSupported) return false;

    try {
      const serializedValue = typeof value === 'string' 
        ? value 
        : JSON.stringify(value);
      
      window.localStorage.setItem(key, serializedValue);
      return true;
    } catch (error) {
      // Handle quota exceeded errors
      if (error.name === 'QuotaExceededError') {
        console.warn('localStorage quota exceeded. Attempting to clear old data...');
        this.clearExpired();
        
        // Try again after clearing
        try {
          const serializedValue = typeof value === 'string' 
            ? value 
            : JSON.stringify(value);
          window.localStorage.setItem(key, serializedValue);
          return true;
        } catch (retryError) {
          console.error('Failed to save to localStorage even after clearing:', retryError);
          return false;
        }
      }
      
      console.error(`Error setting localStorage key "${key}":`, error);
      return false;
    }
  }

  /**
   * Remove item from localStorage
   * @param {string} key - Storage key
   * @returns {boolean} Success status
   */
  remove(key) {
    if (!this.isSupported) return false;

    try {
      window.localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
      return false;
    }
  }

  /**
   * Clear all localStorage data
   * @returns {boolean} Success status
   */
  clear() {
    if (!this.isSupported) return false;

    try {
      window.localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }

  /**
   * Get all keys from localStorage
   * @returns {string[]} Array of keys
   */
  keys() {
    if (!this.isSupported) return [];

    try {
      return Object.keys(window.localStorage);
    } catch (error) {
      console.error('Error getting localStorage keys:', error);
      return [];
    }
  }

  /**
   * Get localStorage usage information
   * @returns {Object} Usage statistics
   */
  getStorageInfo() {
    if (!this.isSupported) {
      return { used: 0, available: 0, total: 0, percentage: 0 };
    }

    try {
      let totalSize = 0;
      
      // Calculate total size of stored data
      for (const key of Object.keys(window.localStorage)) {
        const value = window.localStorage.getItem(key);
        totalSize += key.length + (value?.length || 0);
      }

      // Estimate available space (localStorage limit is typically 5-10MB)
      const estimatedLimit = 5 * 1024 * 1024; // 5MB in bytes
      const used = totalSize * 2; // UTF-16 characters are 2 bytes each
      const available = estimatedLimit - used;
      const percentage = Math.round((used / estimatedLimit) * 100);

      return {
        used,
        available: Math.max(0, available),
        total: estimatedLimit,
        percentage: Math.min(100, Math.max(0, percentage))
      };
    } catch (error) {
      console.error('Error calculating storage info:', error);
      return { used: 0, available: 0, total: 0, percentage: 0 };
    }
  }

  /**
   * Set item with expiration time
   * @param {string} key - Storage key
   * @param {any} value - Value to store
   * @param {number} ttl - Time to live in milliseconds
   * @returns {boolean} Success status
   */
  setWithExpiry(key, value, ttl) {
    if (!this.isSupported) return false;

    const expiryTime = Date.now() + ttl;
    const item = {
      value,
      expiry: expiryTime
    };

    return this.set(key, item);
  }

  /**
   * Get item with expiration check
   * @param {string} key - Storage key
   * @param {any} defaultValue - Default value if expired or not found
   * @returns {any} Value or default value
   */
  getWithExpiry(key, defaultValue = null) {
    if (!this.isSupported) return defaultValue;

    const item = this.get(key);
    
    if (!item || typeof item !== 'object' || !item.expiry) {
      return defaultValue;
    }

    // Check if item has expired
    if (Date.now() > item.expiry) {
      this.remove(key);
      return defaultValue;
    }

    return item.value;
  }

  /**
   * Clear all expired items
   * @returns {number} Number of items cleared
   */
  clearExpired() {
    if (!this.isSupported) return 0;

    let clearedCount = 0;
    const keys = this.keys();

    for (const key of keys) {
      try {
        const item = this.get(key);
        
        // Check if item has expiry and is expired
        if (item && 
            typeof item === 'object' && 
            item.expiry && 
            Date.now() > item.expiry) {
          this.remove(key);
          clearedCount++;
        }
      } catch (error) {
        // If there's an error parsing the item, it might be corrupted
        console.warn(`Removing potentially corrupted item "${key}":`, error);
        this.remove(key);
        clearedCount++;
      }
    }

    console.log(`Cleared ${clearedCount} expired items from localStorage`);
    return clearedCount;
  }

  /**
   * Check if key exists in localStorage
   * @param {string} key - Storage key
   * @returns {boolean} Existence status
   */
  exists(key) {
    if (!this.isSupported) return false;

    try {
      return window.localStorage.getItem(key) !== null;
    } catch (error) {
      console.error(`Error checking existence of localStorage key "${key}":`, error);
      return false;
    }
  }

  /**
   * Get multiple items at once
   * @param {string[]} keys - Array of keys to retrieve
   * @returns {Object} Object with key-value pairs
   */
  getMultiple(keys) {
    const result = {};
    
    for (const key of keys) {
      result[key] = this.get(key);
    }
    
    return result;
  }

  /**
   * Set multiple items at once
   * @param {Object} items - Object with key-value pairs to set
   * @returns {boolean} Success status
   */
  setMultiple(items) {
    if (!this.isSupported) return false;

    try {
      for (const [key, value] of Object.entries(items)) {
        if (!this.set(key, value)) {
          return false;
        }
      }
      return true;
    } catch (error) {
      console.error('Error setting multiple localStorage items:', error);
      return false;
    }
  }

  /**
   * Create a namespaced storage instance
   * @param {string} namespace - Namespace prefix
   * @returns {Object} Namespaced storage methods
   */
  namespace(namespace) {
    const prefix = `${namespace}_`;
    
    return {
      get: (key, defaultValue) => this.get(prefix + key, defaultValue),
      set: (key, value) => this.set(prefix + key, value),
      remove: (key) => this.remove(prefix + key),
      exists: (key) => this.exists(prefix + key),
      clear: () => {
        const keys = this.keys().filter(k => k.startsWith(prefix));
        keys.forEach(key => this.remove(key));
      },
      keys: () => this.keys()
        .filter(key => key.startsWith(prefix))
        .map(key => key.substring(prefix.length))
    };
  }

  /**
   * Subscribe to storage changes
   * @param {Function} callback - Callback function for storage events
   * @returns {Function} Unsubscribe function
   */
  subscribe(callback) {
    if (!this.isSupported) return () => {};

    const handleStorageChange = (event) => {
      if (event.storageArea === window.localStorage) {
        callback({
          key: event.key,
          newValue: event.newValue,
          oldValue: event.oldValue,
          url: event.url
        });
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Return unsubscribe function
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }

  /**
   * Backup localStorage data to a JSON string
   * @returns {string} JSON backup of all localStorage data
   */
  backup() {
    if (!this.isSupported) return '{}';

    try {
      const backup = {};
      for (const key of this.keys()) {
        backup[key] = this.get(key);
      }
      return JSON.stringify(backup, null, 2);
    } catch (error) {
      console.error('Error creating localStorage backup:', error);
      return '{}';
    }
  }

  /**
   * Restore localStorage data from a JSON backup
   * @param {string} backupData - JSON backup string
   * @param {boolean} clearFirst - Whether to clear existing data first
   * @returns {boolean} Success status
   */
  restore(backupData, clearFirst = false) {
    if (!this.isSupported) return false;

    try {
      const data = JSON.parse(backupData);
      
      if (clearFirst) {
        this.clear();
      }

      for (const [key, value] of Object.entries(data)) {
        this.set(key, value);
      }
      
      return true;
    } catch (error) {
      console.error('Error restoring localStorage backup:', error);
      return false;
    }
  }
}

// Create and export storage service instance
const storage = new StorageService();

// Pre-defined storage keys for the app
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'chefconnect_auth_token',
  USER_DATA: 'chefconnect_user_data',
  PREFERENCES: 'chefconnect_preferences',
  FAVORITES: 'chefconnect_favorites',
  SEARCH_HISTORY: 'chefconnect_search_history',
  RECENTLY_VIEWED: 'chefconnect_recently_viewed',
  SHOPPING_LIST: 'chefconnect_shopping_list',
  MEAL_PLAN: 'chefconnect_meal_plan',
  THEME: 'chefconnect_theme',
  LANGUAGE: 'chefconnect_language'
};

// Export storage service and utilities
export { StorageService };
export default storage;