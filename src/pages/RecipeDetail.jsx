import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Button, Rating, Badge } from '../components/ui';
import { 
  ClockIcon, 
  UserIcon, 
  HeartIcon,
  ShareIcon,
  PrinterIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);

  // Mock recipe data
  const mockRecipe = {
    id: 1,
    title: 'Classic Pasta Carbonara',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=800',
    rating: 4.8,
    reviewCount: 156,
    category: 'Main Course',
    prepTime: '15 min',
    cookTime: '15 min',
    servings: 4,
    difficulty: 'Easy',
    description: 'A classic Italian dish that is quick and easy to make. Perfect for a weeknight dinner or special occasion.',
    author: {
      name: 'Marco Rossi',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      bio: 'Professional chef from Rome with 15 years of experience in traditional Italian cuisine.'
    },
    ingredients: [
      { amount: '400g', item: 'spaghetti pasta' },
      { amount: '200g', item: 'guanciale or pancetta, diced' },
      { amount: '4', item: 'large egg yolks' },
      { amount: '1', item: 'whole egg' },
      { amount: '100g', item: 'Pecorino Romano cheese, grated' },
      { amount: '1 tsp', item: 'freshly ground black pepper' },
      { amount: 'to taste', item: 'salt' }
    ],
    instructions: [
      'Bring a large pot of salted water to boil for the pasta.',
      'While water is heating, cut guanciale into small cubes and cook in a large skillet over medium heat until crispy, about 8-10 minutes.',
      'In a bowl, whisk together egg yolks, whole egg, grated cheese, and black pepper.',
      'Cook pasta according to package directions until al dente. Reserve 1 cup of pasta cooking water before draining.',
      'Add drained hot pasta to the skillet with guanciale and remove from heat.',
      'Quickly add the egg mixture to the pasta, tossing continuously to create a creamy sauce. Add pasta water as needed.',
      'Serve immediately with extra cheese and black pepper.'
    ],
    nutrition: {
      calories: 520,
      protein: '22g',
      carbs: '65g',
      fat: '18g'
    },
    tips: [
      'Use room temperature eggs for best results',
      'Work quickly when adding eggs to prevent scrambling',
      'Save some pasta water - it helps create the perfect sauce consistency'
    ]
  };

  useEffect(() => {
    // Simulate API call
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        setRecipe(mockRecipe);
      } catch (error) {
        console.error('Failed to fetch recipe:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: recipe.title,
        text: recipe.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Recipe link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded-lg mb-6"></div>
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!recipe) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Recipe not found</h1>
          <Link to="/recipes">
            <Button>Browse Recipes</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link 
          to="/recipes" 
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Recipes
        </Link>

        {/* Recipe Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Image */}
            <div className="lg:w-1/2">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-64 lg:h-80 object-cover rounded-lg"
              />
            </div>

            {/* Recipe Info */}
            <div className="lg:w-1/2 space-y-6">
              <div>
                <Badge variant="primary" className="mb-2">
                  {recipe.category}
                </Badge>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {recipe.title}
                </h1>
                <p className="text-gray-600 text-lg">
                  {recipe.description}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-4">
                <Rating rating={recipe.rating} />
                <span className="text-sm text-gray-600">
                  ({recipe.reviewCount} reviews)
                </span>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <ClockIcon className="h-4 w-4 text-gray-400" />
                  <span>Prep: {recipe.prepTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ClockIcon className="h-4 w-4 text-gray-400" />
                  <span>Cook: {recipe.cookTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <UserIcon className="h-4 w-4 text-gray-400" />
                  <span>Serves: {recipe.servings}</span>
                </div>
                <div>
                  <Badge variant="success" size="sm">
                    {recipe.difficulty}
                  </Badge>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-4">
                <Button
                  variant={isFavorited ? 'primary' : 'outline'}
                  onClick={handleFavorite}
                >
                  <HeartIcon className="h-4 w-4 mr-2" />
                  {isFavorited ? 'Favorited' : 'Add to Favorites'}
                </Button>
                <Button variant="outline" onClick={handleShare}>
                  <ShareIcon className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="ghost" onClick={() => window.print()}>
                  <PrinterIcon className="h-4 w-4 mr-2" />
                  Print
                </Button>
              </div>

              {/* Author */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={recipe.author.avatar}
                    alt={recipe.author.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Chef {recipe.author.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {recipe.author.bio}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recipe Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ingredients */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 border border-gray-200 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Ingredients
              </h2>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="font-medium text-orange-600 min-w-0">
                      {ingredient.amount}
                    </span>
                    <span className="text-gray-700">{ingredient.item}</span>
                  </li>
                ))}
              </ul>

              {/* Nutrition */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-3">
                  Nutrition (per serving)
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Calories: {recipe.nutrition.calories}</div>
                  <div>Protein: {recipe.nutrition.protein}</div>
                  <div>Carbs: {recipe.nutrition.carbs}</div>
                  <div>Fat: {recipe.nutrition.fat}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Instructions
              </h2>
              <ol className="space-y-4">
                {recipe.instructions.map((step, index) => (
                  <li key={index} className="flex space-x-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-medium text-sm">
                      {index + 1}
                    </span>
                    <p className="text-gray-700 leading-relaxed pt-1">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Tips */}
            {recipe.tips && recipe.tips.length > 0 && (
              <div className="bg-orange-50 rounded-lg p-6">
                <h3 className="font-medium text-gray-900 mb-3">
                  Chef's Tips
                </h3>
                <ul className="space-y-2">
                  {recipe.tips.map((tip, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RecipeDetail;