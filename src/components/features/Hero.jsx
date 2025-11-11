import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-orange-50 to-orange-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to ChefConnect
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Discover amazing recipes from chefs around the world
        </p>
        <Link to="/recipes">
          <Button size="lg">
            Browse Recipes
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;