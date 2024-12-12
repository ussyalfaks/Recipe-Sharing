export interface User {
  _id: string;
  username: string;
  email: string;
  profileImage?: string;
  favorites: string[];
  createdRecipes: string[];
}

export interface Recipe {
  _id: string;
  title: string;
  author: {
    _id: string;
    username: string;
  };
  ingredients: {
    name: string;
    amount: string;
    unit: string;
  }[];
  instructions: {
    step: number;
    text: string;
    time: string;
  }[];
  difficulty: 'easy' | 'medium' | 'hard';
  cuisine: string;
  prepTime: number;
  cookTime: number;
  imageUrl: string;
  likes: string[];
  rating: number;
  comments: {
    user: {
      _id: string;
      username: string;
    };
    text: string;
    createdAt: string;
  }[];
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface RecipeState {
  recipes: Recipe[];
  trending: Recipe[];
  loading: boolean;
  error: string | null;
}