import { useState, useEffect, useContext, createContext } from 'react';
import { storage, AUTH_TOKEN_KEY, AUTH_USER_KEY } from '../utils';

// Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state from storage
  useEffect(() => {
    const initAuth = () => {
      try {
        const storedToken = storage.get(AUTH_TOKEN_KEY);
        const storedUser = storage.get(AUTH_USER_KEY);

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(storedUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        // Clear invalid data
        storage.remove(AUTH_TOKEN_KEY);
        storage.remove(AUTH_USER_KEY);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Login function
  const login = async (credentials) => {
    try {
      setLoading(true);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      const mockUser = {
        id: 1,
        name: 'John Doe',
        email: credentials.email,
        username: 'johndoe',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        bio: 'Passionate home cook and food enthusiast',
        stats: {
          recipes: 24,
          followers: 1247,
          following: 156,
          likes: 3456
        }
      };
      
      const mockToken = 'mock-jwt-token-' + Date.now();

      // Store in state and localStorage
      setUser(mockUser);
      setToken(mockToken);
      setIsAuthenticated(true);
      
      storage.set(AUTH_TOKEN_KEY, mockToken);
      storage.set(AUTH_USER_KEY, mockUser);

      return { success: true, user: mockUser };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.message || 'Login failed' 
      };
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      setLoading(true);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful registration
      const newUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        username: userData.username || userData.email.split('@')[0],
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=f97316&color=fff`,
        bio: '',
        stats: {
          recipes: 0,
          followers: 0,
          following: 0,
          likes: 0
        }
      };
      
      const newToken = 'mock-jwt-token-' + Date.now();

      // Store in state and localStorage
      setUser(newUser);
      setToken(newToken);
      setIsAuthenticated(true);
      
      storage.set(AUTH_TOKEN_KEY, newToken);
      storage.set(AUTH_USER_KEY, newUser);

      return { success: true, user: newUser };
    } catch (error) {
      console.error('Register error:', error);
      return { 
        success: false, 
        error: error.message || 'Registration failed' 
      };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    
    storage.remove(AUTH_TOKEN_KEY);
    storage.remove(AUTH_USER_KEY);
  };

  // Update user profile
  const updateProfile = async (updates) => {
    try {
      setLoading(true);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedUser = { ...user, ...updates };
      
      setUser(updatedUser);
      storage.set(AUTH_USER_KEY, updatedUser);

      return { success: true, user: updatedUser };
    } catch (error) {
      console.error('Update profile error:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to update profile' 
      };
    } finally {
      setLoading(false);
    }
  };

  // Change password
  const changePassword = async (currentPassword, newPassword) => {
    try {
      setLoading(true);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock validation
      if (currentPassword !== 'current-password') {
        throw new Error('Current password is incorrect');
      }

      return { success: true };
    } catch (error) {
      console.error('Change password error:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to change password' 
      };
    } finally {
      setLoading(false);
    }
  };

  // Forgot password
  const forgotPassword = async (email) => {
    try {
      setLoading(true);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      return { success: true };
    } catch (error) {
      console.error('Forgot password error:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to send reset email' 
      };
    } finally {
      setLoading(false);
    }
  };

  // Reset password
  const resetPassword = async (token, newPassword) => {
    try {
      setLoading(true);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      return { success: true };
    } catch (error) {
      console.error('Reset password error:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to reset password' 
      };
    } finally {
      setLoading(false);
    }
  };

  // Check if token is still valid (mock)
  const validateToken = async () => {
    try {
      if (!token) return false;

      // Simulate API validation
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Mock validation - in real app, check with server
      return true;
    } catch (error) {
      console.error('Token validation error:', error);
      logout(); // Auto logout on invalid token
      return false;
    }
  };

  const value = {
    // State
    user,
    token,
    loading,
    isAuthenticated,

    // Actions
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    forgotPassword,
    resetPassword,
    validateToken
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

// Custom hook for authentication checks
export const useAuthCheck = () => {
  const { isAuthenticated, loading } = useAuth();
  
  return {
    isAuthenticated,
    loading,
    isGuest: !loading && !isAuthenticated
  };
};

// Custom hook for protected routes
export const useRequireAuth = (redirectTo = '/login') => {
  const { isAuthenticated, loading } = useAuth();
  
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      // In a real app, you'd use react-router for redirection
      console.log(`Redirecting to ${redirectTo}`);
    }
  }, [isAuthenticated, loading, redirectTo]);
  
  return { isAuthenticated, loading };
};

export default useAuth;