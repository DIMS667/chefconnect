/**
 * Data formatting utilities
 */

// Recipe formatters
export const formatRecipeTime = (time) => {
  if (!time) return 'N/A';
  
  if (typeof time === 'number') {
    if (time < 60) return `${time} min`;
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return minutes > 0 ? `${hours}h ${minutes}min` : `${hours}h`;
  }
  
  return time;
};

export const formatServings = (servings) => {
  if (!servings) return 'N/A';
  return servings === 1 ? '1 serving' : `${servings} servings`;
};

export const formatDifficulty = (difficulty) => {
  if (!difficulty) return 'Unknown';
  return difficulty.charAt(0).toUpperCase() + difficulty.slice(1).toLowerCase();
};

export const formatRecipeCategory = (category) => {
  if (!category) return 'Uncategorized';
  return category.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

export const formatIngredientAmount = (amount, unit = '') => {
  if (!amount) return '';
  
  // Handle fractions
  const fractionMap = {
    '0.25': '¼',
    '0.33': '⅓',
    '0.5': '½',
    '0.66': '⅔',
    '0.67': '⅔',
    '0.75': '¾'
  };
  
  const amountStr = amount.toString();
  if (fractionMap[amountStr]) {
    return `${fractionMap[amountStr]} ${unit}`.trim();
  }
  
  // Handle mixed numbers
  if (amount > 1) {
    const whole = Math.floor(amount);
    const decimal = amount - whole;
    const fraction = fractionMap[decimal.toFixed(2)];
    
    if (fraction) {
      return `${whole} ${fraction} ${unit}`.trim();
    }
  }
  
  return `${amount} ${unit}`.trim();
};

// User formatters
export const formatUserName = (user) => {
  if (!user) return 'Unknown User';
  if (user.firstName && user.lastName) {
    return `${user.firstName} ${user.lastName}`;
  }
  return user.name || user.username || 'Unknown User';
};

export const formatUserJoinDate = (date) => {
  if (!date) return 'Unknown';
  
  const joinDate = new Date(date);
  const now = new Date();
  const diffInMonths = (now.getFullYear() - joinDate.getFullYear()) * 12 + 
                       (now.getMonth() - joinDate.getMonth());
  
  if (diffInMonths < 1) return 'New member';
  if (diffInMonths === 1) return '1 month ago';
  if (diffInMonths < 12) return `${diffInMonths} months ago`;
  
  const years = Math.floor(diffInMonths / 12);
  return years === 1 ? '1 year ago' : `${years} years ago`;
};

export const formatUserStats = (stats) => {
  if (!stats) return {};
  
  return {
    recipes: formatNumber(stats.recipes || 0),
    followers: formatNumber(stats.followers || 0),
    following: formatNumber(stats.following || 0),
    likes: formatNumber(stats.likes || 0)
  };
};

// Number formatters
export const formatNumber = (num) => {
  if (typeof num !== 'number') return '0';
  
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

export const formatPercentage = (value, total, decimals = 1) => {
  if (!total || total === 0) return '0%';
  const percentage = (value / total) * 100;
  return `${percentage.toFixed(decimals)}%`;
};

export const formatCurrency = (amount, currency = 'USD') => {
  if (typeof amount !== 'number') return '$0.00';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

export const formatRating = (rating, maxRating = 5, decimals = 1) => {
  if (typeof rating !== 'number') return '0.0';
  const clamped = Math.min(Math.max(rating, 0), maxRating);
  return clamped.toFixed(decimals);
};

// Date formatters
export const formatDate = (date, format = 'default') => {
  if (!date) return '';
  
  const d = new Date(date);
  if (isNaN(d.getTime())) return 'Invalid Date';
  
  const formats = {
    default: { year: 'numeric', month: 'long', day: 'numeric' },
    short: { year: '2-digit', month: 'short', day: 'numeric' },
    medium: { year: 'numeric', month: 'short', day: 'numeric' },
    long: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
    time: { hour: '2-digit', minute: '2-digit' },
    datetime: { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit' 
    }
  };
  
  return d.toLocaleDateString('en-US', formats[format] || formats.default);
};

export const formatTimeAgo = (date) => {
  if (!date) return '';
  
  const now = new Date();
  const target = new Date(date);
  if (isNaN(target.getTime())) return 'Invalid Date';
  
  const diffInSeconds = Math.floor((now - target) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 }
  ];
  
  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      const suffix = count === 1 ? '' : 's';
      return `${count} ${interval.label}${suffix} ago`;
    }
  }
  
  return 'Just now';
};

export const formatDuration = (seconds) => {
  if (typeof seconds !== 'number' || seconds < 0) return '0s';
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  if (minutes > 0) {
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  return `${remainingSeconds}s`;
};

// Text formatters
export const formatExcerpt = (text, maxLength = 150) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  if (lastSpace === -1) return truncated + '...';
  return truncated.substring(0, lastSpace) + '...';
};

export const formatTitle = (title) => {
  if (!title) return '';
  
  // Convert to title case
  return title
    .toLowerCase()
    .split(' ')
    .map(word => {
      // Don't capitalize articles, prepositions, etc. unless they're the first word
      const lowercaseWords = ['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'if', 'in', 'nor', 'of', 'on', 'or', 'so', 'the', 'to', 'up', 'yet'];
      return lowercaseWords.includes(word) ? word : word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ')
    .replace(/^[a-z]/, char => char.toUpperCase()); // Always capitalize first word
};

export const formatSlug = (text) => {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
};

// File formatters
export const formatFileSize = (bytes) => {
  if (typeof bytes !== 'number' || bytes === 0) return '0 B';
  
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const base = 1024;
  const exponent = Math.floor(Math.log(bytes) / Math.log(base));
  const size = bytes / Math.pow(base, exponent);
  
  return `${size.toFixed(1)} ${units[exponent]}`;
};

export const formatFileName = (filename, maxLength = 30) => {
  if (!filename) return '';
  if (filename.length <= maxLength) return filename;
  
  const extension = filename.split('.').pop();
  const nameWithoutExt = filename.substring(0, filename.lastIndexOf('.'));
  const maxNameLength = maxLength - extension.length - 4; // Account for "..." and "."
  
  if (maxNameLength <= 0) return filename.substring(0, maxLength) + '...';
  
  return nameWithoutExt.substring(0, maxNameLength) + '...' + extension;
};

// URL formatters
export const formatUrl = (url) => {
  if (!url) return '';
  
  // Add protocol if missing
  if (!/^https?:\/\//i.test(url)) {
    return `https://${url}`;
  }
  
  return url;
};

export const formatDomain = (url) => {
  if (!url) return '';
  
  try {
    const domain = new URL(formatUrl(url)).hostname;
    return domain.replace(/^www\./, '');
  } catch {
    return url;
  }
};

// Nutrition formatters
export const formatNutrition = (nutrition) => {
  if (!nutrition) return {};
  
  return {
    calories: nutrition.calories ? `${Math.round(nutrition.calories)} kcal` : 'N/A',
    protein: nutrition.protein ? `${nutrition.protein}g` : 'N/A',
    carbs: nutrition.carbs || nutrition.carbohydrates ? `${nutrition.carbs || nutrition.carbohydrates}g` : 'N/A',
    fat: nutrition.fat ? `${nutrition.fat}g` : 'N/A',
    fiber: nutrition.fiber ? `${nutrition.fiber}g` : 'N/A',
    sugar: nutrition.sugar ? `${nutrition.sugar}g` : 'N/A',
    sodium: nutrition.sodium ? `${nutrition.sodium}mg` : 'N/A'
  };
};

// Search formatters
export const formatSearchQuery = (query) => {
  if (!query) return '';
  
  return query
    .trim()
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .toLowerCase();
};

export const formatSearchResults = (results, query) => {
  if (!Array.isArray(results)) return [];
  
  // Sort by relevance (basic implementation)
  return results.map(result => ({
    ...result,
    relevance: calculateRelevance(result, query)
  })).sort((a, b) => b.relevance - a.relevance);
};

const calculateRelevance = (item, query) => {
  if (!query) return 0;
  
  const searchableText = [
    item.title,
    item.description,
    item.category,
    ...(item.tags || [])
  ].join(' ').toLowerCase();
  
  const queryLower = query.toLowerCase();
  let score = 0;
  
  // Exact match in title gets highest score
  if (item.title && item.title.toLowerCase().includes(queryLower)) {
    score += 10;
  }
  
  // Match in description
  if (item.description && item.description.toLowerCase().includes(queryLower)) {
    score += 5;
  }
  
  // Match in category or tags
  if (item.category && item.category.toLowerCase().includes(queryLower)) {
    score += 3;
  }
  
  // Count word matches
  const words = queryLower.split(' ');
  words.forEach(word => {
    if (searchableText.includes(word)) {
      score += 1;
    }
  });
  
  return score;
};

// Export all formatters
export default {
  // Recipe formatters
  formatRecipeTime,
  formatServings,
  formatDifficulty,
  formatRecipeCategory,
  formatIngredientAmount,
  
  // User formatters
  formatUserName,
  formatUserJoinDate,
  formatUserStats,
  
  // Number formatters
  formatNumber,
  formatPercentage,
  formatCurrency,
  formatRating,
  
  // Date formatters
  formatDate,
  formatTimeAgo,
  formatDuration,
  
  // Text formatters
  formatExcerpt,
  formatTitle,
  formatSlug,
  
  // File formatters
  formatFileSize,
  formatFileName,
  
  // URL formatters
  formatUrl,
  formatDomain,
  
  // Nutrition formatters
  formatNutrition,
  
  // Search formatters
  formatSearchQuery,
  formatSearchResults
};