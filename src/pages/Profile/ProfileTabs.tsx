import { Recipe } from '../../types';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/Tabs';
import RecipeGrid from '../../components/RecipeGrid';

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
  return (
    <Tabs defaultValue="recipes" className="w-full">
      <TabsList className="flex space-x-4 border-b border-gray-200 mb-6">
        <TabsTrigger
          value="recipes"
          onClick={() => onTabChange('recipes')}
          className={`pb-2 text-lg font-medium ${
            activeTab === 'recipes'
              ? 'text-[#e63b19] border-b-2 border-[#e63b19]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          My Recipes
        </TabsTrigger>
        <TabsTrigger
          value="favorites"
          onClick={() => onTabChange('favorites')}
          className={`pb-2 text-lg font-medium ${
            activeTab === 'favorites'
              ? 'text-[#e63b19] border-b-2 border-[#e63b19]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Favorites
        </TabsTrigger>
      </TabsList>

      <TabsContent value="recipes">
        <RecipeGrid title="My Recipes" recipes={recipes} />
      </TabsContent>

      <TabsContent value="favorites">
        <RecipeGrid title="Favorite Recipes" recipes={favorites} />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;