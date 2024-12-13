import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchUserRecipes, fetchUserFavorites } from '../../store/slices/userSlice';
import { useAuth } from '../../hooks/useAuth';
import ProfileHeader from './ProfileHeader';
import ProfileTabs from './ProfileTabs';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const Profile = () => {
  const { user } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const { recipes, favorites, loading } = useSelector((state: RootState) => state.user);
  const [activeTab, setActiveTab] = useState('recipes');

  useEffect(() => {
    if (user) {
      dispatch(fetchUserRecipes(user._id));
      dispatch(fetchUserFavorites(user._id));
    }
  }, [dispatch, user]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-lg text-gray-600">Please log in to view your profile</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProfileHeader user={user} />
      <ProfileTabs
        recipes={recipes}
        favorites={favorites}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
};

export default Profile;