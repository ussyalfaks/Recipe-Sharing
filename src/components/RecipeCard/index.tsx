import { Link } from 'react-router-dom';
import { Clock, Star } from 'lucide-react';

interface RecipeCardProps {
  id: string;
  title: string;
  author: string;
  cookTime: number;
  rating: number;
  imageUrl: string;
}

const RecipeCard = ({ id, title, author, cookTime, rating, imageUrl }: RecipeCardProps) => {
  return (
    <Link to={`/recipe/${id}`} className="flex flex-col gap-3 pb-3">
      <div
        className=" w-full md:w-9/12 bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
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
    </Link>
  );
};

export default RecipeCard;