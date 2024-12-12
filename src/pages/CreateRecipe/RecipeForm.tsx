import React, { useState } from 'react';
//import { PlusCircle, Trash2 } from 'lucide-react';
import type { RecipeFormData } from './types';
import ImageUpload from './ImageUpload';
import IngredientInput from './IngredientInput';
import InstructionInput from './InstructionInput';

interface RecipeFormProps {
  onSubmit: (data: RecipeFormData) => void;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<RecipeFormData>({
    title: '',
    cuisine: '',
    difficulty: 'medium',
    prepTime: 0,
    cookTime: 0,
    ingredients: [{ name: '', amount: '', unit: '' }],
    instructions: [{ step: 1, text: '', time: '' }],
    imageUrl: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Recipe Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e63b19] focus:ring-[#e63b19]"
            required
          />
        </div>

        <ImageUpload
          value={formData.imageUrl}
          onChange={(url) => setFormData({ ...formData, imageUrl: url })}
        />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Cuisine Type</label>
            <input
              type="text"
              name="cuisine"
              value={formData.cuisine}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e63b19] focus:ring-[#e63b19]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Difficulty</label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e63b19] focus:ring-[#e63b19]"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Prep Time (minutes)</label>
            <input
              type="number"
              name="prepTime"
              value={formData.prepTime}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e63b19] focus:ring-[#e63b19]"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Cook Time (minutes)</label>
            <input
              type="number"
              name="cookTime"
              value={formData.cookTime}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e63b19] focus:ring-[#e63b19]"
              min="0"
            />
          </div>
        </div>

        <IngredientInput
          ingredients={formData.ingredients}
          onChange={(ingredients) => setFormData({ ...formData, ingredients })}
        />

        <InstructionInput
          instructions={formData.instructions}
          onChange={(instructions) => setFormData({ ...formData, instructions })}
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#e63b19] hover:bg-[#d63516] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e63b19]"
        >
          Create Recipe
        </button>
      </div>
    </form>
  );
};

export default RecipeForm;