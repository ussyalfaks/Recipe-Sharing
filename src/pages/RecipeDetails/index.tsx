import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, MessageCircle, Bookmark } from 'lucide-react';
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

        {/* Comments section */}
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Comments</h2>
          
          {user ? (
            <form onSubmit={handleComment} className="mb-6">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#e63b19] focus:border-[#e63b19]"
                rows={3}
              />
              <button
                type="submit"
                className="mt-2 px-4 py-2 bg-[#e63b19] text-white rounded-lg hover:bg-[#d63516]"
                disabled={!comment.trim()}
              >
                Post Comment
              </button>
            </form>
          ) : (
            <p className="text-gray-600 mb-4">Please log in to comment</p>
          )}

          <div className="space-y-4">
            {recipe.comments.map((comment, index) => (
              <div key={index} className="border-b border-gray-200 pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold">{comment.user.username}</span>
                  <span className="text-gray-500 text-sm">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700">{comment.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;