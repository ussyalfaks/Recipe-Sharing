import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { Recipe } from '../../types';

interface UserState {
  recipes: Recipe[];
  favorites: Recipe[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  recipes: [],
  favorites: [],
  loading: false,
  error: null,
};

export const updateProfileImage = createAsyncThunk(
  'user/updateProfileImage',
  async (imageData: string) => {
    const response = await api.patch('/users/profile-image', { imageData });
    return response.data;
  }
);

export const fetchUserRecipes = createAsyncThunk(
  'user/fetchRecipes',
  async (userId: string) => {
    const response = await api.get(`/users/${userId}/recipes`);
    return response.data;
  }
);

export const fetchUserFavorites = createAsyncThunk(
  'user/fetchFavorites',
  async (userId: string) => {
    const response = await api.get(`/users/${userId}/favorites`);
    return response.data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(updateProfileImage.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateProfileImage.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(updateProfileImage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to update profile image';
    })
    
      .addCase(fetchUserRecipes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload;
      })
      .addCase(fetchUserRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch recipes';
      })
      .addCase(fetchUserFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
      });
  },
});

export default userSlice.reducer;