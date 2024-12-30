import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { Recipe } from '../../types';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/Tabs';
import RecipeGrid from '../../components/RecipeGrid';
import ImageUpdateModal from '../../components/ImageUpdateModal';
import { deleteRecipe, updateRecipeImage } from '../../store/slices/recipeSlice';

interface ProfileTabsProps {
  recipes: Recipe[];
  favorites: Recipe[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({
  recipes,
  favorites,
  activeTab,
  onTabChange,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const handleDeleteRecipe = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        await dispatch(deleteRecipe(id)).unwrap();
      } catch (error) {
        console.error('Failed to delete recipe:', error);
      }
    }
  };

  const handleUpdateImage = async (imageUrl: string) => {
    if (selectedRecipeId) {
      try {
        await dispatch(updateRecipeImage({ id: selectedRecipeId, imageUrl })).unwrap();
        setIsImageModalOpen(false);
        setSelectedRecipeId(null);
      } catch (error) {
        console.error('Failed to update recipe image:', error);
      }
    }
  };

  const openImageModal = (id: string) => {
    setSelectedRecipeId(id);
    setIsImageModalOpen(true);
  };

  return (
    <>
      <Tabs defaultValue={activeTab} className="w-full">
        <TabsList className="flex space-x-4 border-b border-gray-200 mb-6">
          <TabsTrigger
            value="recipes"
            className={`pb-2 text-lg font-medium ${
              activeTab === 'recipes'
                ? 'text-[#e63b19] border-b-2 border-[#e63b19]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => onTabChange('recipes')}
          >
            My Recipes
          </TabsTrigger>
          <TabsTrigger
            value="favorites"
            className={`pb-2 text-lg font-medium ${
              activeTab === 'favorites'
                ? 'text-[#e63b19] border-b-2 border-[#e63b19]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => onTabChange('favorites')}
          >
            Favorites
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recipes">
          <RecipeGrid
            title="My Recipes"
            recipes={recipes}
            isOwner={true}
            onDelete={handleDeleteRecipe}
            onImageUpdate={openImageModal}
          />
        </TabsContent>

        <TabsContent value="favorites">
          <RecipeGrid title="Favorite Recipes" recipes={favorites} />
        </TabsContent>
      </Tabs>

      <ImageUpdateModal
        isOpen={isImageModalOpen}
        onClose={() => {
          setIsImageModalOpen(false);
          setSelectedRecipeId(null);
        }}
        onUpdate={handleUpdateImage}
      />
    </>
  );
};

export default ProfileTabs;