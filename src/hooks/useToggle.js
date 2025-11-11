import { useState, useCallback } from 'react';

/**
 * Hook for managing boolean state with toggle functionality
 * @param {boolean} initialValue - Initial boolean value (default: false)
 * @returns {[boolean, Function, Function, Function]} [value, toggle, setTrue, setFalse]
 */
export const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(!!initialValue);

  const toggle = useCallback(() => {
    setValue(prev => !prev);
  }, []);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  return [value, toggle, setTrue, setFalse];
};

/**
 * Hook for managing multiple toggleable states
 * @param {Object} initialStates - Object with initial boolean states
 * @returns {Object} Object with current states and toggle functions
 */
export const useMultipleToggle = (initialStates = {}) => {
  const [states, setStates] = useState(() => {
    const normalizedStates = {};
    Object.keys(initialStates).forEach(key => {
      normalizedStates[key] = !!initialStates[key];
    });
    return normalizedStates;
  });

  const toggle = useCallback((key) => {
    setStates(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  }, []);

  const setTrue = useCallback((key) => {
    setStates(prev => ({
      ...prev,
      [key]: true
    }));
  }, []);

  const setFalse = useCallback((key) => {
    setStates(prev => ({
      ...prev,
      [key]: false
    }));
  }, []);

  const setValue = useCallback((key, value) => {
    setStates(prev => ({
      ...prev,
      [key]: !!value
    }));
  }, []);

  const resetAll = useCallback(() => {
    const resetStates = {};
    Object.keys(initialStates).forEach(key => {
      resetStates[key] = !!initialStates[key];
    });
    setStates(resetStates);
  }, [initialStates]);

  return {
    states,
    toggle,
    setTrue,
    setFalse,
    setValue,
    resetAll
  };
};

/**
 * Hook for managing visibility with auto-hide functionality
 * @param {number} autoHideDelay - Delay in milliseconds before auto-hiding (0 to disable)
 * @param {boolean} initialVisible - Initial visibility state
 * @returns {Object} Visibility state and controls
 */
export const useAutoHideToggle = (autoHideDelay = 0, initialVisible = false) => {
  const [isVisible, setIsVisible] = useState(initialVisible);
  const [timeoutId, setTimeoutId] = useState(null);

  const show = useCallback(() => {
    setIsVisible(true);
    
    // Clear existing timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set auto-hide if delay is specified
    if (autoHideDelay > 0) {
      const id = setTimeout(() => {
        setIsVisible(false);
        setTimeoutId(null);
      }, autoHideDelay);
      setTimeoutId(id);
    }
  }, [autoHideDelay, timeoutId]);

  const hide = useCallback(() => {
    setIsVisible(false);
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
  }, [timeoutId]);

  const toggle = useCallback(() => {
    if (isVisible) {
      hide();
    } else {
      show();
    }
  }, [isVisible, hide, show]);

  // Clean up timeout on unmount
  useState(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return {
    isVisible,
    show,
    hide,
    toggle
  };
};

/**
 * Hook for managing loading states with minimum duration
 * @param {number} minDuration - Minimum loading duration in milliseconds
 * @returns {Object} Loading state and controls
 */
export const useLoadingToggle = (minDuration = 0) => {
  const [isLoading, setIsLoading] = useState(false);
  const [startTime, setStartTime] = useState(null);

  const startLoading = useCallback(() => {
    setIsLoading(true);
    setStartTime(Date.now());
  }, []);

  const stopLoading = useCallback(() => {
    if (minDuration > 0 && startTime) {
      const elapsed = Date.now() - startTime;
      const remainingTime = minDuration - elapsed;

      if (remainingTime > 0) {
        setTimeout(() => {
          setIsLoading(false);
          setStartTime(null);
        }, remainingTime);
      } else {
        setIsLoading(false);
        setStartTime(null);
      }
    } else {
      setIsLoading(false);
      setStartTime(null);
    }
  }, [minDuration, startTime]);

  const toggleLoading = useCallback(() => {
    if (isLoading) {
      stopLoading();
    } else {
      startLoading();
    }
  }, [isLoading, startLoading, stopLoading]);

  return {
    isLoading,
    startLoading,
    stopLoading,
    toggleLoading
  };
};

/**
 * Hook for managing modal/dialog visibility
 * @param {boolean} initialOpen - Initial open state
 * @returns {Object} Modal state and controls
 */
export const useModal = (initialOpen = false) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleModal = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal
  };
};

/**
 * Hook for managing dropdown/menu visibility with outside click detection
 * @param {boolean} initialOpen - Initial open state
 * @returns {Object} Dropdown state, controls, and ref for container
 */
export const useDropdown = (initialOpen = false) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const containerRef = useRef(null);

  const openDropdown = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleDropdown = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, closeDropdown]);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      return () => document.removeEventListener('keydown', handleEscapeKey);
    }
  }, [isOpen, closeDropdown]);

  return {
    isOpen,
    openDropdown,
    closeDropdown,
    toggleDropdown,
    containerRef
  };
};

/**
 * Hook for managing theme toggle (dark/light mode)
 * @param {string} defaultTheme - Default theme ('light' or 'dark')
 * @returns {Object} Theme state and controls
 */
export const useThemeToggle = (defaultTheme = 'light') => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || defaultTheme;
    }
    return defaultTheme;
  });

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
    }
  }, [theme]);

  const setLightTheme = useCallback(() => {
    setTheme('light');
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', 'light');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  const setDarkTheme = useCallback(() => {
    setTheme('dark');
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', 'dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  // Apply theme to document on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  return {
    theme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
    toggleTheme,
    setLightTheme,
    setDarkTheme
  };
};

/**
 * Hook for managing sidebar/navigation visibility
 * @param {boolean} initialOpen - Initial open state
 * @param {number} breakpoint - Screen width breakpoint for auto-close (in pixels)
 * @returns {Object} Sidebar state and controls
 */
export const useSidebar = (initialOpen = false, breakpoint = 768) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const openSidebar = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeSidebar = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  // Auto-close sidebar on small screens when window resizes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < breakpoint && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, breakpoint]);

  return {
    isOpen,
    openSidebar,
    closeSidebar,
    toggleSidebar
  };
};

export default useToggle;