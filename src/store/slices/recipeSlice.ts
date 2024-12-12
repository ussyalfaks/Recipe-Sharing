import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Recipe } from '../../types';
import api from '../../utils/api';
import type { RecipeFormData } from '../../pages/CreateRecipe/types';

interface RecipeState {
  recipes: Recipe[];
  trending: Recipe[];
  currentRecipe: Recipe | null;
  loading: boolean;
  error: string | null;
}

const initialState: RecipeState = {
  recipes: [],
  trending: [],
  currentRecipe: null,
  loading: false,
  error: null,
};

// Thunk actions
export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async (filters?: { ingredients?: string; difficulty?: string; cuisine?: string }) => {
    const response = await api.get('/recipes', { params: filters });
    return response.data;
  }
);

export const fetchTrendingRecipes = createAsyncThunk(
  'recipes/fetchTrending',
  async () => {
    const response = await api.get('/recipes/trending');
    return response.data;
  }
);

export const createRecipe = createAsyncThunk(
  'recipes/createRecipe',
  async (recipeData: RecipeFormData) => {
    const response = await api.post('/recipes', recipeData);
    return response.data;
  }
);

export const fetchRecipeById = createAsyncThunk(
  'recipes/fetchRecipeById',
  async (id: string) => {
    const response = await api.get(`/recipes/${id}`);
    return response.data;
  }
);

export const likeRecipe = createAsyncThunk(
  'recipes/likeRecipe',
  async (id: string) => {
    const response = await api.post(`/recipes/${id}/like`);
    return response.data;
  }
);

export const addComment = createAsyncThunk(
  'recipes/addComment',
  async ({ id, text }: { id: string; text: string }) => {
    const response = await api.post(`/recipes/${id}/comments`, { text });
    return response.data;
  }
);

const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    clearRecipeError: (state) => {
      state.error = null;
    },
    clearCurrentRecipe: (state) => {
      state.currentRecipe = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Recipes
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch recipes';
      })
      // Fetch Trending
      .addCase(fetchTrendingRecipes.fulfilled, (state, action) => {
        state.trending = action.payload;
      })
      // Create Recipe
      .addCase(createRecipe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = [...state.recipes, action.payload];
        state.currentRecipe = action.payload;
      })
      .addCase(createRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create recipe';
      })
      // Fetch Recipe by ID
      .addCase(fetchRecipeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipeById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentRecipe = action.payload;
      })
      .addCase(fetchRecipeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch recipe';
      })
      // Like Recipe
      .addCase(likeRecipe.fulfilled, (state, action) => {
        const updatedRecipe = action.payload;
        state.recipes = state.recipes.map(recipe => 
          recipe._id === updatedRecipe._id ? updatedRecipe : recipe
        );
        if (state.currentRecipe?._id === updatedRecipe._id) {
          state.currentRecipe = updatedRecipe;
        }
      })
      // Add Comment
      .addCase(addComment.fulfilled, (state, action) => {
        const updatedRecipe = action.payload;
        state.recipes = state.recipes.map(recipe => 
          recipe._id === updatedRecipe._id ? updatedRecipe : recipe
        );
        if (state.currentRecipe?._id === updatedRecipe._id) {
          state.currentRecipe = updatedRecipe;
        }
      });
  },
});

export const { clearRecipeError, clearCurrentRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;