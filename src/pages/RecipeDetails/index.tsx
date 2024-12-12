import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, MessageCircle, Bookmark, Clock, Star } from 'lucide-react';
import api from '../../utils/api';
import { Recipe } from '../../types';
import { useAuth } from '../../hooks/useAuth';

const RecipeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [comment, setComment] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await api.get(`/recipes/${id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };
    fetchRecipe();
  }, [id]);

  const handleLike = async () => {
    if (!user) return;
    try {
      await api.post(`/recipes/${id}/like`);
      const response = await api.get(`/recipes/${id}`);
      setRecipe(response.data);
    } catch (error) {
      console.error('Error liking recipe:', error);
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !comment.trim()) return;
    try {
      await api.post(`/recipes/${id}/comments`, { text: comment });
      const response = await api.get(`/recipes/${id}`);
      setRecipe(response.data);
      setComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  if (!recipe) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e63b19]"></div>
      </div>
    );
  }

  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex w-full grow bg-white @container p-4">
          <div className="w-full gap-1 overflow-hidden bg-white @[480px]:gap-2 aspect-[3/2] rounded-xl">
            <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-full object-cover rounded-xl" />
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-3 p-4">
          <div className="flex min-w-72 flex-col gap-3">
            <h1 className="text-[#181211] tracking-light text-[32px] font-bold leading-tight">{recipe.title}</h1>
            <p className="text-[#886963] text-sm">By: {recipe.author.username}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 px-4 py-2 justify-between">
          <button onClick={handleLike} className="flex items-center gap-2 text-[#886963] hover:text-[#e63b19]">
            <Heart className={`h-6 w-6 ${recipe.likes.includes(user?._id || '') ? 'fill-[#e63b19] text-[#e63b19]' : ''}`} />
            <span>{recipe.likes.length}</span>
          </button>
          
          <div className="flex items-center gap-2 text-[#886963]">
            <MessageCircle className="h-6 w-6" />
            <span>{recipe.comments.length}</span>
          </div>

          <button className="flex items-center gap-2 text-[#886963] hover:text-[#e63b19]">
            <Bookmark className="h-6 w-6" />
            <span>Save</span>
          </button>
        </div>

        {/* Recipe content sections */}
        {/* Add ingredients, instructions, and comments sections here */}
      </div>
    </div>
  );
};

export default RecipeDetails;