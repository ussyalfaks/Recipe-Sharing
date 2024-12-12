import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { createRecipe } from '../../store/slices/recipeSlice';
import RecipeForm from './RecipeForm';
import { useAuth } from '../../hooks/useAuth';
import type { RecipeFormData } from './types';

const CreateRecipe = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleSubmit = async (formData: RecipeFormData) => {
    try {
      const recipe = await dispatch(createRecipe(formData)).unwrap();
      navigate(`/recipe/${recipe._id}`);
    } catch (error) {
      console.error('Failed to create recipe:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Recipe</h1>
      <RecipeForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateRecipe;