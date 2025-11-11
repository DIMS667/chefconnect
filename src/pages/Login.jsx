import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import LoginForm from '../components/features/LoginForm';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (formData) => {
    console.log('Login data:', formData);
    // TODO: Implement actual authentication logic
    // For now, just navigate to home
    navigate('/');
  };

  return (
    <AuthLayout 
      title="Welcome Back!"
      subtitle="Login to continue your culinary journey."
    >
      <LoginForm onLogin={handleLogin} />
    </AuthLayout>
  );
};

export default Login;