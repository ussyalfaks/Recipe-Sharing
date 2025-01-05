import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Star, Trash2, Image as ImageIcon } from 'lucide-react';

interface RecipeCardProps {
  id: string;
  title: string;
  author: string;
  cookTime: number;
  rating: number;
  imageUrl: string;
  isOwner?: boolean;
  onDelete?: (id: string) => void;
  onImageUpdate?: (id: string) => void;
}

const RecipeCard = ({ 
  id, 
  title, 
  author, 
  cookTime, 
  rating, 
  imageUrl,
  isOwner,
  onDelete,
  onImageUpdate 
}: RecipeCardProps) => {
  // Use useCallback to memoize handlers
  const handleDelete = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      onDelete?.(id);
    }
  }, [id, onDelete]);

  const handleImageUpdate = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    onImageUpdate?.(id);
  }, [id, onImageUpdate]);

  return (
    <div className="flex flex-col gap-3 pb-3 relative group">
      <Link to={`/recipe/${id}`}>
        <div
          className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      </Link>
      <div>
        <p className="text-[#181211] text-base font-medium leading-normal">{title}</p>
        <p className="text-[#886963] text-sm font-normal leading-normal">By {author}</p>
        <div className="flex items-center gap-2 text-[#886963] text-sm">
          <Clock className="h-4 w-4" />
          <span>{cookTime} mins</span>
          <Star className="h-4 w-4 ml-2" />
          <span>{rating}</span>
        </div>
      </div>

      {isOwner && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
          <button
            onClick={handleImageUpdate}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
            title="Update Image"
          >
            <ImageIcon className="h-4 w-4 text-[#e63b19]" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
            title="Delete Recipe"
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </button>
        </div>
      )}
    </div>
  );
};

export default React.memo(RecipeCard);