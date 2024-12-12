import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Search, Star } from 'lucide-react';
import { RootState } from '../../store/store';
import { logout } from '../../store/slices/authSlice';
import SearchBar from '../SearchBar';

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f4f1f0] px-10 py-3">
      <div className="flex items-center gap-4 text-[#181211]">
        <Link to="/" className="flex items-center gap-2">
          <div className="size-4">
            <Star className="h-4 w-4" />
          </div>
          <h2 className="text-[#181211] text-lg font-bold leading-tight tracking-[-0.015em]">Foodie</h2>
        </Link>
      </div>
      
      <div className="flex flex-1 justify-end gap-8">
        <SearchBar />
        <div className="flex gap-2">
          {user ? (
            <>
              <Link
                to="/create-recipe"
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#e63b19] text-white text-sm font-bold leading-normal tracking-[0.015em]"
              >
                Post Recipe
              </Link>
              <button
                onClick={() => dispatch(logout())}
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f4f1f0] text-[#181211] text-sm font-bold leading-normal tracking-[0.015em]"
              >
                Logout
              </button>
              <Link to="/profile">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                  style={{ backgroundImage: `url(${user.profileImage || 'https://via.placeholder.com/40'})` }}
                />
              </Link>
            </>
          ) : (
            <Link
              to="/login"
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f4f1f0] text-[#181211] text-sm font-bold leading-normal tracking-[0.015em]"
            >
              Log in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;