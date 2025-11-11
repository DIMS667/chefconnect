import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import RecipeGrid from '../components/features/RecipeGrid';
import { Button, Input, Badge } from '../components/ui';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';

const Recipes = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);

  // Mock recipes data
  const mockRecipes = [
    {
      id: 1,
      title: 'Classic Margherita Pizza',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500',
      rating: 4.8,
      category: 'main-courses',
      prepTime: '30 min',
      description: 'Traditional Italian pizza with fresh mozzarella, tomatoes, and basil.',
      author: { name: 'Marco Rossi' }
    },
    {
      id: 2,
      title: 'Chicken Caesar Salad',
      image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500',
      rating: 4.5,
      category: 'appetizers',
      prepTime: '15 min',
      description: 'Fresh romaine lettuce with grilled chicken and homemade caesar dressing.',
      author: { name: 'Sarah Johnson' }
    },
    {
      id: 3,
      title: 'Chocolate Lava Cake',
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500',
      rating: 4.7,
      category: 'desserts',
      prepTime: '25 min',
      description: 'Rich, decadent dessert with a molten chocolate center.',
      author: { name: 'Chef Antoine' }
    },
    {
      id: 4,
      title: 'Green Smoothie Bowl',
      image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=500',
      rating: 4.6,
      category: 'beverages',
      prepTime: '10 min',
      description: 'Healthy smoothie bowl topped with fresh fruits and granola.',
      author: { name: 'Emma Green' }
    },
    {
      id: 5,
      title: 'Vegan Buddha Bowl',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500',
      rating: 4.4,
      category: 'vegetarian',
      prepTime: '20 min',
      description: 'Nutritious bowl with quinoa, roasted vegetables, and tahini dressing.',
      author: { name: 'David Kim' }
    },
    {
      id: 6,
      title: 'Beef Wellington',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500',
      rating: 4.9,
      category: 'main-courses',
      prepTime: '2 hours',
      description: 'Classic British dish with beef tenderloin wrapped in pastry.',
      author: { name: 'Gordon Ramsay' }
    }
  ];

  const categories = [
    { id: '', name: 'All Categories' },
    { id: 'main-courses', name: 'Main Courses' },
    { id: 'appetizers', name: 'Appetizers' },
    { id: 'desserts', name: 'Desserts' },
    { id: 'beverages', name: 'Beverages' },
    { id: 'vegetarian', name: 'Vegetarian' }
  ];

  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'newest', label: 'Newest' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'prep-time', label: 'Quick & Easy' }
  ];

  // Filter and sort recipes
  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || recipe.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchQuery) {
      params.set('search', searchQuery);
    } else {
      params.delete('search');
    }
    setSearchParams(params);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const params = new URLSearchParams(searchParams);
    if (category) {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    setSearchParams(params);
  };

  useEffect(() => {
    // Simulate API call
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        setRecipes(mockRecipes);
      } catch (error) {
        console.error('Failed to fetch recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Discover Amazing Recipes
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Browse through our collection of delicious recipes from chefs around the world
              </p>
            </div>

            {/* Search */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Search recipes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  />
                </div>
                <Button type="submit">
                  Search
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Filters and Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-white rounded-lg p-6 space-y-6">
                <div className="flex items-center justify-between lg:justify-start">
                  <h3 className="font-semibold text-gray-900">Filters</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden"
                  >
                    <FunnelIcon className="h-4 w-4" />
                  </Button>
                </div>

                {/* Categories */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategoryChange(category.id)}
                        className={`
                          w-full text-left px-3 py-2 rounded-lg text-sm transition-colors
                          ${selectedCategory === category.id
                            ? 'bg-orange-100 text-orange-600 font-medium'
                            : 'text-gray-600 hover:bg-gray-100'
                          }
                        `}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Sort By</h4>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Mobile Filter Toggle */}
              <div className="flex items-center justify-between mb-6 lg:hidden">
                <h2 className="text-xl font-semibold text-gray-900">
                  Recipes ({filteredRecipes.length})
                </h2>
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <FunnelIcon className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>

              {/* Active Filters */}
              {(searchQuery || selectedCategory) && (
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm text-gray-600">Active filters:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {searchQuery && (
                      <Badge variant="primary">
                        Search: "{searchQuery}"
                      </Badge>
                    )}
                    {selectedCategory && (
                      <Badge variant="primary">
                        Category: {categories.find(c => c.id === selectedCategory)?.name}
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Results Count */}
              <div className="hidden lg:block mb-6">
                <p className="text-gray-600">
                  Showing {filteredRecipes.length} recipes
                </p>
              </div>

              {/* Recipes Grid */}
              <RecipeGrid recipes={filteredRecipes} loading={loading} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Recipes;