import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui';
import RecipeGrid from './RecipeGrid';

const PopularRecipes = ({ recipes = [], loading = false }) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12">
          <div className="mb-4 sm:mb-0">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Popular Recipes
            </h2>
            <p className="text-gray-600">
              Discover the most loved recipes by our community
            </p>
          </div>
          
          <Link to="/recipes">
            <Button variant="outline">
              View All Recipes
            </Button>
          </Link>
        </div>

        {/* Recipes Grid */}
        <RecipeGrid 
          recipes={recipes.slice(0, 4)} 
          loading={loading}
          columns={4}
        />

        {/* Call to Action */}
        {!loading && recipes.length > 0 && (
          <div className="text-center mt-12">
            <Link to="/recipes">
              <Button size="lg">
                Explore More Recipes
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularRecipes;