import React from 'react';
import { Clock, ChefHat, Utensils } from 'lucide-react';
import { Recipe } from '../../types';
import { formatDifficulty } from '../../utils/recipeUtils';

interface RecipeInfoProps {
  recipe: Recipe;
}

const RecipeInfo: React.FC<RecipeInfoProps> = ({ recipe }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-white rounded-xl shadow-sm">
      <div className="flex items-center gap-3">
        <Clock className="h-6 w-6 text-[#e63b19]" />
        <div>
          <p className="text-sm text-gray-600">Total Time</p>
          <p className="font-medium">{recipe.prepTime + recipe.cookTime} mins</p>
          <div className="text-xs text-gray-500">
            <span>Prep: {recipe.prepTime} mins</span>
            <span className="mx-1">•</span>
            <span>Cook: {recipe.cookTime} mins</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <ChefHat className="h-6 w-6 text-[#e63b19]" />
        <div>
          <p className="text-sm text-gray-600">Difficulty</p>
          <p className="font-medium">{formatDifficulty(recipe.difficulty)}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Utensils className="h-6 w-6 text-[#e63b19]" />
        <div>
          <p className="text-sm text-gray-600">Cuisine</p>
          <p className="font-medium">{recipe.cuisine || 'Not specified'}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeInfo;