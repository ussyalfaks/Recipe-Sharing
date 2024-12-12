import React from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';
import type { Ingredient } from './types';

interface IngredientInputProps {
  ingredients: Ingredient[];
  onChange: (ingredients: Ingredient[]) => void;
}

const IngredientInput: React.FC<IngredientInputProps> = ({ ingredients, onChange }) => {
  const addIngredient = () => {
    onChange([...ingredients, { name: '', amount: '', unit: '' }]);
  };

  const removeIngredient = (index: number) => {
    onChange(ingredients.filter((_, i) => i !== index));
  };

  const updateIngredient = (index: number, field: keyof Ingredient, value: string) => {
    const updated = ingredients.map((ingredient, i) => 
      i === index ? { ...ingredient, [field]: value } : ingredient
    );
    onChange(updated);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-medium text-gray-700">Ingredients</label>
        <button
          type="button"
          onClick={addIngredient}
          className="inline-flex items-center text-sm text-[#e63b19] hover:text-[#d63516]"
        >
          <PlusCircle className="h-4 w-4 mr-1" />
          Add Ingredient
        </button>
      </div>
      
      {ingredients.map((ingredient, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <input
            type="text"
            value={ingredient.name}
            onChange={(e) => updateIngredient(index, 'name', e.target.value)}
            placeholder="Ingredient name"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-[#e63b19] focus:ring-[#e63b19]"
          />
          <input
            type="text"
            value={ingredient.amount}
            onChange={(e) => updateIngredient(index, 'amount', e.target.value)}
            placeholder="Amount"
            className="w-24 rounded-md border-gray-300 shadow-sm focus:border-[#e63b19] focus:ring-[#e63b19]"
          />
          <input
            type="text"
            value={ingredient.unit}
            onChange={(e) => updateIngredient(index, 'unit', e.target.value)}
            placeholder="Unit"
            className="w-24 rounded-md border-gray-300 shadow-sm focus:border-[#e63b19] focus:ring-[#e63b19]"
          />
          <button
            type="button"
            onClick={() => removeIngredient(index)}
            className="text-gray-400 hover:text-gray-500"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default IngredientInput;