import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
//  import jwt from 'jsonwebtoken';
import authRoutes from './routes/';
import recipeRoutes from './routes/recipes.js';
import userRoutes from './routes/users.js';
import cookieParser from 'cookie-parser';
dotenv.config();


// const __filename = fileURLToPath(import.meta.url);
//  const __dirname = dirname(__filename);


const app = express();
const PORT = process.env.PORT || 10000;



app.get('/', (req, res) => {
  res.send('App is running');
});


app.use(cors({
  origin: [
    'https://recipe-sharing-rouge.vercel.app'

  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
}));
 
app.options('*', cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/users', userRoutes);





// MongoDB connection
console.log("Attempting to connect to MongoDB...");
mongoose.connect(process.env.MONGODB_URI ||'mongodb+srv://byussy9:Wz9thuzcNmXEl8vL@recipesharing.q05t6.mongodb.net/?retryWrites=true&w=majority&appName=RecipeSharing' )
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));


  // Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});

