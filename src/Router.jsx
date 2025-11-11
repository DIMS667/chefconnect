import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import pages
import {
  Home,
  Login,
  Register,
  Recipes,
  RecipeDetail,
  Profile,
  About,
  Blog,
  NotFound
} from './pages';

// Import layout and providers
import { AuthProvider } from './hooks/useAuth.jsx';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  // For now, we'll allow all routes since we're using mock data
  // In a real app, you'd check authentication status here
  return children;
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<Blog />} />
          
          {/* User profiles */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:username" element={<Profile />} />
          
          {/* Protected routes */}
          <Route path="/create-recipe" element={
            <ProtectedRoute>
              {/* We'll create this page later */}
              <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-bold">Create Recipe Page - Coming Soon</h1>
              </div>
            </ProtectedRoute>
          } />
          
          {/* Redirects */}
          <Route path="/dashboard" element={<Navigate to="/profile" replace />} />
          
          {/* Catch all - 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRouter;