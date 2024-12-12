import express from 'express';
import { auth } from '../middleware/auth.js';
import {
  createRecipe,
  getRecipes,
  getTrendingRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  likeRecipe,
  addComment,
} from '../controllers/recipeController.js';

const router = express.Router();

router.post('/', auth, createRecipe);
router.get('/', getRecipes);
router.get('/trending', getTrendingRecipes);
router.get('/:id', getRecipeById);
router.put('/:id', auth, updateRecipe);
router.delete('/:id', auth, deleteRecipe);
router.post('/:id/like', auth, likeRecipe);
router.post('/:id/comments', auth, addComment);

export default router;