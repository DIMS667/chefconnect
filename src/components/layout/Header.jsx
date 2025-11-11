import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MagnifyingGlassIcon, 
  SunIcon, 
  MoonIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { Button, Input } from '../ui';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigation = [
    { name: 'Recipes', href: '/recipes' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' }
  ];

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Logique pour changer le thème
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🍳</span>
              </div>
              <span className="text-xl font-bold text-gray-900">ChefConnect</span>
            </Link>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isDarkMode ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-2">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">
                  Sign Up
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-4">
              {/* Mobile Search */}
              <div className="px-4">
                <Input
                  placeholder="Search recipes..."
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Mobile Navigation */}
              <div className="space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Mobile Auth */}
              <div className="px-4 space-y-2">
                <Link to="/login" className="block">
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/register" className="block">
                  <Button className="w-full">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;