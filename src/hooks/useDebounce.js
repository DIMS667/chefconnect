import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Hook that debounces a value
 * @param {any} value - The value to debounce
 * @param {number} delay - The delay in milliseconds
 * @returns {any} The debounced value
 */
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set debouncedValue to value (passed in) after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cancel the timeout if value changes (also on delay change or unmount)
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Hook that debounces a callback function
 * @param {Function} callback - The function to debounce
 * @param {number} delay - The delay in milliseconds
 * @param {Array} deps - Dependencies array
 * @returns {Function} The debounced callback
 */
export const useDebouncedCallback = (callback, delay, deps = []) => {
  const timeoutRef = useRef();

  const debouncedCallback = useCallback((...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay, ...deps]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
};

/**
 * Hook for debounced search functionality
 * @param {Function} searchFunction - The search function to execute
 * @param {number} delay - The debounce delay (default: 500ms)
 * @returns {Object} Search state and functions
 */
export const useDebouncedSearch = (searchFunction, delay = 500) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncedQuery = useDebounce(query, delay);

  // Execute search when debounced query changes
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      setLoading(false);
      setError(null);
      return;
    }

    const performSearch = async () => {
      try {
        setLoading(true);
        setError(null);
        const searchResults = await searchFunction(debouncedQuery);
        setResults(searchResults || []);
      } catch (err) {
        setError(err.message || 'Search failed');
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [debouncedQuery, searchFunction]);

  const clearSearch = useCallback(() => {
    setQuery('');
    setResults([]);
    setError(null);
  }, []);

  return {
    query,
    setQuery,
    results,
    loading,
    error,
    clearSearch,
    hasQuery: debouncedQuery.trim().length > 0
  };
};

/**
 * Hook for debounced form validation
 * @param {Object} values - Form values to validate
 * @param {Function} validationFunction - Function that returns validation errors
 * @param {number} delay - Debounce delay (default: 300ms)
 * @returns {Object} Validation state
 */
export const useDebouncedValidation = (values, validationFunction, delay = 300) => {
  const [errors, setErrors] = useState({});
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const debouncedValues = useDebounce(values, delay);

  useEffect(() => {
    if (!validationFunction) return;

    const validateForm = async () => {
      try {
        setIsValidating(true);
        const validationErrors = await validationFunction(debouncedValues);
        setErrors(validationErrors || {});
        setIsValid(Object.keys(validationErrors || {}).length === 0);
      } catch (err) {
        console.error('Validation error:', err);
        setErrors({ general: 'Validation failed' });
        setIsValid(false);
      } finally {
        setIsValidating(false);
      }
    };

    validateForm();
  }, [debouncedValues, validationFunction]);

  return {
    errors,
    isValid,
    isValidating
  };
};

/**
 * Hook for debounced auto-save functionality
 * @param {any} data - Data to auto-save
 * @param {Function} saveFunction - Function to save the data
 * @param {number} delay - Debounce delay (default: 2000ms)
 * @returns {Object} Auto-save state
 */
export const useDebouncedAutoSave = (data, saveFunction, delay = 2000) => {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [saveError, setSaveError] = useState(null);

  const debouncedData = useDebounce(data, delay);

  useEffect(() => {
    if (!saveFunction || !debouncedData) return;

    const autoSave = async () => {
      try {
        setIsSaving(true);
        setSaveError(null);
        await saveFunction(debouncedData);
        setLastSaved(new Date());
      } catch (err) {
        setSaveError(err.message || 'Auto-save failed');
      } finally {
        setIsSaving(false);
      }
    };

    autoSave();
  }, [debouncedData, saveFunction]);

  const forceSave = useCallback(async () => {
    if (!saveFunction || !data) return;

    try {
      setIsSaving(true);
      setSaveError(null);
      await saveFunction(data);
      setLastSaved(new Date());
    } catch (err) {
      setSaveError(err.message || 'Save failed');
    } finally {
      setIsSaving(false);
    }
  }, [data, saveFunction]);

  return {
    isSaving,
    lastSaved,
    saveError,
    forceSave
  };
};

/**
 * Hook for debounced API calls with request cancellation
 * @param {Function} apiFunction - The API function to call
 * @param {number} delay - Debounce delay (default: 500ms)
 * @returns {Object} API state and functions
 */
export const useDebouncedAPI = (apiFunction, delay = 500) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const abortControllerRef = useRef();

  const debouncedCall = useDebouncedCallback(
    async (...args) => {
      // Cancel previous request if it exists
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new AbortController for this request
      abortControllerRef.current = new AbortController();

      try {
        setLoading(true);
        setError(null);

        const result = await apiFunction(...args, {
          signal: abortControllerRef.current.signal
        });

        setData(result);
      } catch (err) {
        // Don't set error if request was aborted
        if (err.name !== 'AbortError') {
          setError(err.message || 'API call failed');
        }
      } finally {
        setLoading(false);
      }
    },
    delay,
    [apiFunction]
  );

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const reset = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setLoading(false);
    setError(null);
    setData(null);
  }, []);

  return {
    call: debouncedCall,
    loading,
    error,
    data,
    reset
  };
};

/**
 * Hook that combines multiple debounced values
 * @param {Object} values - Object with values to debounce
 * @param {number} delay - Debounce delay
 * @returns {Object} Object with debounced values
 */
export const useMultipleDebounce = (values, delay) => {
  const [debouncedValues, setDebouncedValues] = useState(values);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValues(values);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [values, delay]);

  return debouncedValues;
};

/**
 * Hook for debounced window resize handling
 * @param {Function} callback - Callback to execute on resize
 * @param {number} delay - Debounce delay (default: 250ms)
 */
export const useDebouncedResize = (callback, delay = 250) => {
  const debouncedCallback = useDebouncedCallback(callback, delay);

  useEffect(() => {
    window.addEventListener('resize', debouncedCallback);
    
    return () => {
      window.removeEventListener('resize', debouncedCallback);
    };
  }, [debouncedCallback]);
};

/**
 * Hook for debounced scroll handling
 * @param {Function} callback - Callback to execute on scroll
 * @param {number} delay - Debounce delay (default: 100ms)
 * @param {Element} element - Element to listen to (default: window)
 */
export const useDebouncedScroll = (callback, delay = 100, element = null) => {
  const debouncedCallback = useDebouncedCallback(callback, delay);

  useEffect(() => {
    const target = element || window;
    target.addEventListener('scroll', debouncedCallback);
    
    return () => {
      target.removeEventListener('scroll', debouncedCallback);
    };
  }, [debouncedCallback, element]);
};

export default useDebounce;