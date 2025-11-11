import React from 'react';
import { Link } from 'react-router-dom';
import CategoryCard from './CategoryCard';

const Categories = ({ categories = [] }) => {
  const defaultCategories = [
    {
      id: 'main-courses',
      name: 'Main Courses',
      icon: '🍽️',
      count: 145,
      description: 'Hearty dishes for lunch and dinner',
      color: 'orange'
    },
    {
      id: 'appetizers',
      name: 'Appetizers',
      icon: '🥗',
      count: 67,
      description: 'Perfect starters for any meal',
      color: 'green'
    },
    {
      id: 'desserts',
      name: 'Desserts',
      icon: '🍰',
      count: 89,
      description: 'Sweet treats and delightful endings',
      color: 'purple'
    },
    {
      id: 'beverages',
      name: 'Beverages',
      icon: '🥤',
      count: 34,
      description: 'Refreshing drinks and cocktails',
      color: 'blue'
    },
    {
      id: 'vegetarian',
      name: 'Vegetarian',
      icon: '🥕',
      count: 112,
      description: 'Plant-based meals full of flavor',
      color: 'green'
    }
  ];

  const displayCategories = categories.length > 0 ? categories : defaultCategories;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Browse by Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our diverse collection of recipes organized by cuisine type and dietary preferences
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {displayCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        {/* Additional Categories Link */}
        <div className="text-center mt-12">
          <Link 
            to="/categories"
            className="text-orange-600 hover:text-orange-700 font-medium inline-flex items-center"
          >
            View All Categories
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Categories;