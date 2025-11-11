// Export all custom hooks
export { useAuth, AuthProvider, useAuthCheck, useRequireAuth } from './useAuth.jsx';
export { 
  useRecipes, 
  useFavoriteRecipes, 
  useRecipeForm 
} from './useRecipes';
export { 
  useLocalStorage,
  useUserPreferences,
  useSearchHistory,
  useRecentlyViewed,
  useShoppingList,
  useMealPlan,
  useAppSettings
} from './useLocalStorage';
export {
  useDebounce,
  useDebouncedCallback,
  useDebouncedSearch,
  useDebouncedValidation,
  useDebouncedAutoSave,
  useDebouncedAPI,
  useMultipleDebounce,
  useDebouncedResize,
  useDebouncedScroll
} from './useDebounce';
export {
  useToggle,
  useMultipleToggle,
  useAutoHideToggle,
  useLoadingToggle,
  useModal,
  useDropdown,
  useThemeToggle,
  useSidebar
} from './useToggle';