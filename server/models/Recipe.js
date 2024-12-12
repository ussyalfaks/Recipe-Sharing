import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ingredients: [{ 
    name: String,
    amount: String,
    unit: String
  }],
  instructions: [{ 
    step: Number,
    text: String,
    time: String
  }],
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'] },
  cuisine: { type: String },
  prepTime: { type: Number },
  cookTime: { type: Number },
  imageUrl: { type: String },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: String,
    createdAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now }
});

recipeSchema.index({ title: 'text', 'ingredients.name': 'text', cuisine: 'text' });

export default mongoose.model('Recipe', recipeSchema);