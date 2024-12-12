import Recipe from '../models/Recipe.js';

export const createRecipe = async (req, res) => {
  try {
    const recipe = new Recipe({
      ...req.body,
      author: req.user.id,
    });
    await recipe.save();
    await recipe.populate('author', 'username');
    res.status(201).json(recipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getRecipes = async (req, res) => {
  try {
    const { ingredients, difficulty, cuisine } = req.query;
    let query = {};

    if (ingredients) {
      query['ingredients.name'] = { $in: ingredients.split(',') };
    }
    if (difficulty) {
      query.difficulty = difficulty;
    }
    if (cuisine) {
      query.cuisine = cuisine;
    }

    const recipes = await Recipe.find(query)
      .populate('author', 'username')
      .sort({ createdAt: -1 });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTrendingRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find()
      .populate('author', 'username')
      .sort({ likes: -1 })
      .limit(5);
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
      .populate('author', 'username')
      .populate('comments.user', 'username');
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    if (recipe.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    Object.assign(recipe, req.body);
    await recipe.save();
    await recipe.populate('author', 'username');
    res.json(recipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    if (recipe.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await recipe.remove();
    res.json({ message: 'Recipe deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const likeRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    const index = recipe.likes.indexOf(req.user.id);
    if (index === -1) {
      recipe.likes.push(req.user.id);
    } else {
      recipe.likes.splice(index, 1);
    }

    await recipe.save();
    res.json(recipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    recipe.comments.push({
      user: req.user.id,
      text: req.body.text,
    });

    await recipe.save();
    await recipe.populate('comments.user', 'username');
    res.json(recipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};