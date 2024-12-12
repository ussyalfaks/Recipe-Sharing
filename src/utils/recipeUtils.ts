import { Recipe } from '../types';

export const calculateTotalTime = (recipe: Recipe): number => {
  return recipe.prepTime + recipe.cookTime;
};

export const formatDifficulty = (difficulty: string): string => {
  return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
};

export const sortRecipesByLikes = (recipes: Recipe[]): Recipe[] => {
  return [...recipes].sort((a, b) => b.likes.length - a.likes.length);
};

export const filterRecipesByIngredients = (recipes: Recipe[], ingredients: string[]): Recipe[] => {
  return recipes.filter(recipe => 
    ingredients.every(ingredient => 
      recipe.ingredients.some(ri => 
        ri.name.toLowerCase().includes(ingredient.toLowerCase())
      )
    )
  );
};

export const filterRecipesByCuisine = (recipes: Recipe[], cuisine: string): Recipe[] => {
  return recipes.filter(recipe => 
    recipe.cuisine.toLowerCase() === cuisine.toLowerCase()
  );
};

export const filterRecipesByDifficulty = (recipes: Recipe[], difficulty: string): Recipe[] => {
  return recipes.filter(recipe => 
    recipe.difficulty.toLowerCase() === difficulty.toLowerCase()
  );
};