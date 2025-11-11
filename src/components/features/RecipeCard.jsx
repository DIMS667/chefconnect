import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Rating, Badge } from '../ui';

const RecipeCard = ({ recipe }) => {
  const {
    id,
    title,
    image,
    rating = 0,
    category,
    prepTime,
    author,
    description
  } = recipe;

  return (
    <Card hover className="overflow-hidden group">
      <Link to={`/recipes/${id}`}>
        {/* Image */}
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {category && (
            <div className="absolute top-3 left-3">
              <Badge variant="primary">{category}</Badge>
            </div>
          )}
          {prepTime && (
            <div className="absolute top-3 right-3">
              <Badge variant="default" className="bg-black/50 text-white">
                {prepTime}
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <h3 className="font-semibold text-lg text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2">
            {title}
          </h3>
          
          {description && (
            <p className="text-gray-600 text-sm line-clamp-2">
              {description}
            </p>
          )}

          <div className="flex items-center justify-between">
            <Rating rating={rating} showValue={false} />
            <span className="text-sm text-gray-500">{rating} stars</span>
          </div>

          {author && (
            <div className="flex items-center space-x-2 pt-2 border-t border-gray-100">
              <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-orange-600">
                  {author.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-sm text-gray-600">by {author.name}</span>
            </div>
          )}
        </div>
      </Link>
    </Card>
  );
};

export default RecipeCard;