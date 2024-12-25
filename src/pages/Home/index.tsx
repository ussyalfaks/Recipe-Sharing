import React, { useEffect } from 'react';
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e63b19]"></div>
      </div>
    );
  }

  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className=" flex flex-col max-w-7xl flex-1">
        <div className="@container">
          <div className="@[480px]:p-4">
            <div
              className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-start justify-end px-4 pb-10 @[480px]:px-10"
              style={{
                backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=2000&q=80")',
              }}
            >
              <div className="flex flex-col gap-2 text-left">
                <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl">
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
  );
};

export default Home;