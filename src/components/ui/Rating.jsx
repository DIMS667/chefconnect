import React from 'react';

const Star = ({ filled, half = false }) => (
  <svg 
    className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
    fill="currentColor" 
    viewBox="0 0 20 20"
  >
    {half ? (
      <defs>
        <linearGradient id="half">
          <stop offset="50%" stopColor="currentColor" />
          <stop offset="50%" stopColor="#D1D5DB" />
        </linearGradient>
      </defs>
    ) : null}
    <path 
      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
      fill={half ? 'url(#half)' : 'currentColor'}
    />
  </svg>
);

const Rating = ({ 
  rating = 0, 
  maxRating = 5, 
  showValue = true,
  size = 'md',
  className = ''
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= maxRating; i++) {
      const filled = i <= rating;
      const half = i === Math.ceil(rating) && rating % 1 !== 0;
      
      stars.push(
        <Star 
          key={i} 
          filled={filled} 
          half={half}
        />
      );
    }
    return stars;
  };

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      <div className="flex space-x-1">
        {renderStars()}
      </div>
      {showValue && (
        <span className="text-sm text-gray-600 ml-2">
          {rating.toFixed(1)} stars
        </span>
      )}
    </div>
  );
};

export default Rating;