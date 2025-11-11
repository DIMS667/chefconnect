import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import Hero from '../components/features/Hero';
import PopularRecipes from '../components/features/PopularRecipes';
import Categories from '../components/features/Categories';

const Home = () => {
  const [popularRecipes, setPopularRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for popular recipes
  const mockRecipes = [
    {
      id: 1,
      title: 'Classic Margherita Pizza',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500',
      rating: 4.8,
      category: 'Main Course',
      prepTime: '30 min',
      description: 'Traditional Italian pizza with fresh mozzarella, tomatoes, and basil.',
      author: { name: 'Marco Rossi' }
    },
    {
      id: 2,
      title: 'Hearty Chicken Noodle Soup',
      image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=500',
      rating: 4.5,
      category: 'Soup',
      prepTime: '45 min',
      description: 'Comforting homemade soup perfect for cold days.',
      author: { name: 'Sarah Johnson' }
    },
    {
      id: 3,
      title: 'Molten Chocolate Lava Cake',
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500',
      rating: 4.7,
      category: 'Dessert',
      prepTime: '25 min',
      description: 'Rich, decadent dessert with a molten chocolate center.',
      author: { name: 'Chef Antoine' }
    },
    {
      id: 4,
      title: 'Quinoa Salad with Lemon Vinaigrette',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500',
      rating: 4.6,
      category: 'Vegetarian',
      prepTime: '20 min',
      description: 'Fresh and healthy salad packed with nutrients.',
      author: { name: 'Emma Green' }
    }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchPopularRecipes = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setPopularRecipes(mockRecipes);
      } catch (error) {
        console.error('Failed to fetch popular recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularRecipes();
  }, []);

  return (
    <Layout>
      <div className="space-y-0">
        <Hero />
        <PopularRecipes recipes={popularRecipes} loading={loading} />
        <Categories />
        
        {/* From the Pros Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                From the Pros
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Learn from world-renowned chefs and culinary experts
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Chef Quote 1 */}
              <div className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto rounded-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=150"
                    alt="Gordon Ramsay"
                    className="w-full h-full object-cover"
                  />
                </div>
                <blockquote className="text-lg italic text-gray-700">
                  "Cooking is a philosophy; it's not a recipe."
                </blockquote>
                <cite className="text-orange-600 font-medium">– Gordon Ramsay</cite>
              </div>

              {/* Chef Quote 2 */}
              <div className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto rounded-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=150"
                    alt="Julia Child"
                    className="w-full h-full object-cover"
                  />
                </div>
                <blockquote className="text-lg italic text-gray-700">
                  "The only real stumbling block is fear of failure. In cooking you've got to have a what-the-hell attitude."
                </blockquote>
                <cite className="text-orange-600 font-medium">– Julia Child</cite>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;