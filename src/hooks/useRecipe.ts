import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { 
  fetchRecipes, 
  fetchTrendingRecipes,
  fetchRecipeById,
  likeRecipe,
  addComment,
  clearCurrentRecipe 
} from '../store/slices/recipeSlice';

export const useRecipe = (id?: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const { 
    recipes,
    trending,
    currentRecipe,
    loading,
    error 
  } = useSelector((state: RootState) => state.recipes);

  useEffect(() => {
    if (id) {
      dispatch(fetchRecipeById(id));
    }
    return () => {
      dispatch(clearCurrentRecipe());
    };
  }, [dispatch, id]); // Added proper dependency array

  const handleLike = useCallback(async (recipeId: string) => {
    try {
      await dispatch(likeRecipe(recipeId)).unwrap();
    } catch (error) {
      console.error('Failed to like recipe:', error);
    }
  }, [dispatch]); // Added proper dependency array

  const handleComment = useCallback(async (recipeId: string, text: string) => {
    try {
      await dispatch(addComment({ id: recipeId, text })).unwrap();
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  }, [dispatch]); // Added proper dependency array

  return {
    recipes,
    trending,
    currentRecipe,
    loading,
    error,
    handleLike,
    handleComment,
  };
};