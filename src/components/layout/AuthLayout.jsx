import React from 'react';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children, title, subtitle, showLogo = true }) => {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-md">
          {showLogo && (
            <div className="mb-8">
              <Link to="/" className="flex items-center justify-center space-x-2">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">🍳</span>
                </div>
                <span className="text-2xl font-bold text-gray-900">ChefConnect</span>
              </Link>
            </div>
          )}

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 text-gray-600">
                {subtitle}
              </p>
            )}
          </div>

          {children}
        </div>
      </div>

      {/* Right side - Image/Background */}
      <div className="hidden lg:block lg:flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <img
            src="/images/cooking-background.jpg"
            alt="Cooking"
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </div>
        
        {/* Overlay content */}
        <div className="relative z-10 flex items-center justify-center h-full p-12">
          <div className="text-center text-white">
            <h3 className="text-3xl font-bold mb-4">
              Join Our Culinary Community
            </h3>
            <p className="text-lg opacity-90 max-w-md">
              Connect with chefs worldwide, share your favorite recipes, 
              and discover new flavors every day.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;