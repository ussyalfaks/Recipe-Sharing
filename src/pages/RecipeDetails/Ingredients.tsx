import React from 'react';
import { Recipe } from '../../types';

interface IngredientsProps {
  ingredients: Recipe['ingredients'];
}

const Ingredients: React.FC<IngredientsProps> = ({ ingredients }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-bold mb-4">Ingredients</h2>
      <ul className="space-y-3">
        {ingredients.map((ingredient, index) => (
          <li key={index} className="flex justify-between items-center">
            <span className="text-gray-800">{ingredient.name}</span>
            <span className="text-gray-600">
              {ingredient.amount} {ingredient.unit}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ingredients;