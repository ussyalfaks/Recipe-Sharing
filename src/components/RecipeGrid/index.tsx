import RecipeCard from '../RecipeCard';
import { Recipe } from '../../types';

interface RecipeGridProps {
  title: string;
  recipes: Recipe[];
}

const RecipeGrid = ({ title, recipes }: RecipeGridProps) => {
  return (
    <div>
      <h2 className="text-[#181211] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 p-4">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            id={recipe._id}
            title={recipe.title}
            author={recipe.author.username}
            cookTime={recipe.cookTime}
            rating={recipe.rating}
            imageUrl={recipe.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default RecipeGrid;