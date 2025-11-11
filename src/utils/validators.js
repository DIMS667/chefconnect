/**
 * Form validation utilities
 */

// Basic validators
export const required = (value, message = 'This field is required') => {
  if (value === null || value === undefined || value === '') {
    return message;
  }
  if (Array.isArray(value) && value.length === 0) {
    return message;
  }
  return null;
};

export const minLength = (min, message) => (value) => {
  if (!value) return null; // Let required handle empty values
  if (value.length < min) {
    return message || `Must be at least ${min} characters`;
  }
  return null;
};

export const maxLength = (max, message) => (value) => {
  if (!value) return null;
  if (value.length > max) {
    return message || `Must be no more than ${max} characters`;
  }
  return null;
};

export const pattern = (regex, message) => (value) => {
  if (!value) return null;
  if (!regex.test(value)) {
    return message || 'Invalid format';
  }
  return null;
};

// Email validation
export const email = (value, message = 'Please enter a valid email address') => {
  if (!value) return null;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return message;
  }
  return null;
};

// Password validation
export const password = (value, message) => {
  if (!value) return null;
  
  const errors = [];
  
  if (value.length < 8) {
    errors.push('at least 8 characters');
  }
  if (!/[a-z]/.test(value)) {
    errors.push('one lowercase letter');
  }
  if (!/[A-Z]/.test(value)) {
    errors.push('one uppercase letter');
  }
  if (!/\d/.test(value)) {
    errors.push('one number');
  }
  
  if (errors.length > 0) {
    return message || `Password must contain ${errors.join(', ')}`;
  }
  
  return null;
};

export const confirmPassword = (passwordValue, message = 'Passwords do not match') => (value) => {
  if (!value) return null;
  if (value !== passwordValue) {
    return message;
  }
  return null;
};

// Username validation
export const username = (value, message) => {
  if (!value) return null;
  
  if (value.length < 3) {
    return 'Username must be at least 3 characters';
  }
  if (value.length > 30) {
    return 'Username must be no more than 30 characters';
  }
  if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
    return 'Username can only contain letters, numbers, underscore, and dash';
  }
  
  return message ? null : null;
};

// Number validators
export const number = (value, message = 'Must be a valid number') => {
  if (!value && value !== 0) return null;
  if (isNaN(Number(value))) {
    return message;
  }
  return null;
};

export const min = (minimum, message) => (value) => {
  if (!value && value !== 0) return null;
  const num = Number(value);
  if (isNaN(num) || num < minimum) {
    return message || `Must be at least ${minimum}`;
  }
  return null;
};

export const max = (maximum, message) => (value) => {
  if (!value && value !== 0) return null;
  const num = Number(value);
  if (isNaN(num) || num > maximum) {
    return message || `Must be no more than ${maximum}`;
  }
  return null;
};

export const integer = (value, message = 'Must be a whole number') => {
  if (!value && value !== 0) return null;
  const num = Number(value);
  if (isNaN(num) || !Number.isInteger(num)) {
    return message;
  }
  return null;
};

export const positive = (value, message = 'Must be a positive number') => {
  if (!value && value !== 0) return null;
  const num = Number(value);
  if (isNaN(num) || num <= 0) {
    return message;
  }
  return null;
};

// URL validation
export const url = (value, message = 'Please enter a valid URL') => {
  if (!value) return null;
  
  try {
    // Add protocol if missing
    const urlToTest = value.startsWith('http') ? value : `https://${value}`;
    new URL(urlToTest);
    return null;
  } catch {
    return message;
  }
};

// File validation
export const fileSize = (maxSize, message) => (file) => {
  if (!file) return null;
  if (file.size > maxSize) {
    const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(1);
    return message || `File size must be less than ${maxSizeMB}MB`;
  }
  return null;
};

export const fileType = (allowedTypes, message) => (file) => {
  if (!file) return null;
  if (!allowedTypes.includes(file.type)) {
    return message || `File type must be one of: ${allowedTypes.join(', ')}`;
  }
  return null;
};

// Recipe-specific validators
export const recipeName = (value) => {
  const errors = [];
  
  if (!value?.trim()) {
    errors.push(required(value, 'Recipe name is required'));
  } else {
    if (value.length < 3) {
      errors.push('Recipe name must be at least 3 characters');
    }
    if (value.length > 100) {
      errors.push('Recipe name must be no more than 100 characters');
    }
  }
  
  return errors.filter(Boolean)[0] || null;
};

export const recipeTime = (value) => {
  if (!value) return 'Preparation time is required';
  
  // Accept formats like: "30 min", "1 hour", "2h 30min", etc.
  const timeRegex = /^(\d+)\s*(min|minute|minutes|h|hr|hour|hours)(\s+(\d+)\s*(min|minute|minutes))?$/i;
  
  if (!timeRegex.test(value.trim())) {
    return 'Please enter time in format like "30 min" or "1 hour 30 min"';
  }
  
  return null;
};

export const servings = (value) => {
  if (!value) return 'Number of servings is required';
  
  const num = Number(value);
  if (isNaN(num) || num < 1 || num > 50 || !Number.isInteger(num)) {
    return 'Servings must be a whole number between 1 and 50';
  }
  
  return null;
};

export const ingredients = (value) => {
  if (!Array.isArray(value) || value.length === 0) {
    return 'At least one ingredient is required';
  }
  
  for (let i = 0; i < value.length; i++) {
    const ingredient = value[i];
    if (!ingredient?.name?.trim()) {
      return `Ingredient ${i + 1} name is required`;
    }
    if (!ingredient?.amount?.trim()) {
      return `Ingredient ${i + 1} amount is required`;
    }
  }
  
  return null;
};

export const instructions = (value) => {
  if (!Array.isArray(value) || value.length === 0) {
    return 'At least one instruction step is required';
  }
  
  for (let i = 0; i < value.length; i++) {
    const step = value[i];
    if (!step?.trim()) {
      return `Instruction step ${i + 1} cannot be empty`;
    }
    if (step.length < 10) {
      return `Instruction step ${i + 1} must be at least 10 characters`;
    }
  }
  
  return null;
};

// Form validation utilities
export const validateForm = (values, validators) => {
  const errors = {};
  
  Object.keys(validators).forEach(field => {
    const fieldValidators = Array.isArray(validators[field]) 
      ? validators[field] 
      : [validators[field]];
    
    for (const validator of fieldValidators) {
      const error = validator(values[field]);
      if (error) {
        errors[field] = error;
        break; // Stop at first error for this field
      }
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateField = (value, validators) => {
  const fieldValidators = Array.isArray(validators) ? validators : [validators];
  
  for (const validator of fieldValidators) {
    const error = validator(value);
    if (error) {
      return error;
    }
  }
  
  return null;
};

// Async validators
export const asyncEmail = async (value, checkAvailability) => {
  const basicError = email(value);
  if (basicError) return basicError;
  
  if (checkAvailability) {
    const isAvailable = await checkAvailability(value);
    if (!isAvailable) {
      return 'This email is already registered';
    }
  }
  
  return null;
};

export const asyncUsername = async (value, checkAvailability) => {
  const basicError = username(value);
  if (basicError) return basicError;
  
  if (checkAvailability) {
    const isAvailable = await checkAvailability(value);
    if (!isAvailable) {
      return 'This username is already taken';
    }
  }
  
  return null;
};

// Custom validator creator
export const custom = (validatorFn, message) => (value) => {
  const isValid = validatorFn(value);
  return isValid ? null : message;
};

// Compose multiple validators
export const compose = (...validators) => (value) => {
  for (const validator of validators) {
    const error = validator(value);
    if (error) return error;
  }
  return null;
};

// Conditional validator
export const when = (condition, validator) => (value, allValues) => {
  if (condition(allValues)) {
    return validator(value);
  }
  return null;
};

// Common validation schemas
export const authSchemas = {
  login: {
    email: [required, email],
    password: [required]
  },
  
  register: {
    name: [required, minLength(2), maxLength(50)],
    email: [required, email],
    password: [required, password],
    confirmPassword: [required] // confirmPassword validator needs to be applied separately
  },
  
  forgotPassword: {
    email: [required, email]
  },
  
  resetPassword: {
    password: [required, password],
    confirmPassword: [required]
  }
};

export const recipeSchemas = {
  create: {
    name: [recipeName],
    description: [required, maxLength(500)],
    category: [required],
    difficulty: [required],
    prepTime: [recipeTime],
    cookTime: [recipeTime],
    servings: [servings],
    ingredients: [ingredients],
    instructions: [instructions]
  },
  
  update: {
    name: [recipeName],
    description: [maxLength(500)],
    prepTime: [recipeTime],
    cookTime: [recipeTime],
    servings: [servings],
    ingredients: [ingredients],
    instructions: [instructions]
  }
};

export const profileSchemas = {
  update: {
    name: [required, minLength(2), maxLength(50)],
    bio: [maxLength(200)],
    location: [maxLength(100)],
    website: [url]
  }
};

// Export all validators
export default {
  // Basic validators
  required,
  minLength,
  maxLength,
  pattern,
  
  // Specific validators
  email,
  password,
  confirmPassword,
  username,
  number,
  min,
  max,
  integer,
  positive,
  url,
  fileSize,
  fileType,
  
  // Recipe validators
  recipeName,
  recipeTime,
  servings,
  ingredients,
  instructions,
  
  // Form utilities
  validateForm,
  validateField,
  
  // Async validators
  asyncEmail,
  asyncUsername,
  
  // Utilities
  custom,
  compose,
  when,
  
  // Schemas
  authSchemas,
  recipeSchemas,
  profileSchemas
};