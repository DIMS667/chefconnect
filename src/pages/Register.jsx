import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import RegisterForm from '../components/features/RegisterForm';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (formData) => {
    console.log('Register data:', formData);
    // TODO: Implement actual registration logic
    // For now, just navigate to home
    navigate('/');
  };

  return (
    <AuthLayout 
      title="Join ChefConnect"
      subtitle="Create your account and start sharing amazing recipes."
    >
      <RegisterForm onRegister={handleRegister} />
    </AuthLayout>
  );
};

export default Register;