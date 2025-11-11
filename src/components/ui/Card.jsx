import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  hover = false,
  padding = 'md',
  ...props 
}) => {
  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    none: 'p-0'
  };

  const classes = `
    bg-white rounded-lg shadow-md
    ${hover ? 'hover:shadow-lg transition-shadow duration-200 cursor-pointer' : ''}
    ${paddings[padding]}
    ${className}
  `.trim();

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Card;