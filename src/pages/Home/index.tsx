import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchRecipes, fetchTrendingRecipes } from '../../store/slices/recipeSlice';
import RecipeGrid from '../../components/RecipeGrid';

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { recipes, trending, loading } = useSelector((state: RootState) => state.recipes);

  useEffect(() => {
    dispatch(fetchRecipes());
    dispatch(fetchTrendingRecipes());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className=" loader"></div>
      </div>
    );
  }

  return (
 <>
    <div className=" flex justify-center pb-5">
      <div className=" flex flex-col w-full">
        <div className=" ">
          <div className="">
            <div
              className="flex max-w-full min-h-[480px] flex-col  bg-cover bg-center bg-no-repeat items-start justify-end px-4 pb-12"
              style={{
                backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=2000&q=80")',
              }}
            >
              <div className="flex flex-col gap-2 text-left">
                <h1 className="text-white text-4xl font-black leading-tight @[480px]:text-5xl">
                  Discover the best recipes
                </h1>
                <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base">
                  Join the community of home cooks, culinary enthusiasts, and professional chefs who are sharing their favorite recipes
                </h2>
              </div>
            </div>
          </div>
        </div>
        
        <RecipeGrid title="Trending Recipes" recipes={trending} />
        <RecipeGrid title="Popular Recipes" recipes={recipes} />
      </div>
    </div>
 </>
  );
};

export default Home;