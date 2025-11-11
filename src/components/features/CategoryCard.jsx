import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../ui';

const CategoryCard = ({ category }) => {
  const {
    id,
    name,
    icon,
    count,
    description,
    color = 'orange'
  } = category;

  const colors = {
    orange: 'bg-orange-100 text-orange-600 border-orange-200',
    blue: 'bg-blue-100 text-blue-600 border-blue-200',
    green: 'bg-green-100 text-green-600 border-green-200',
    purple: 'bg-purple-100 text-purple-600 border-purple-200',
    red: 'bg-red-100 text-red-600 border-red-200'
  };

  return (
    <Link to={`/recipes?category=${id}`}>
      <Card 
        hover 
        className="text-center transition-all duration-200 hover:scale-105"
      >
        <div className="space-y-4">
          {/* Icon */}
          <div className={`
            w-16 h-16 mx-auto rounded-full border-2 flex items-center justify-center
            ${colors[color]}
          `}>
            <span className="text-3xl">{icon}</span>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {name}
            </h3>
            
            {description && (
              <p className="text-sm text-gray-600 line-clamp-2">
                {description}
              </p>
            )}
            
            {count !== undefined && (
              <p className="text-sm text-gray-500">
                {count} {count === 1 ? 'recipe' : 'recipes'}
              </p>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default CategoryCard;