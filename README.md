# Recipe Sharing Site

Welcome to the **Recipe Sharing Site**, where users can explore, share, and interact with a world of culinary delights! This platform allows users to post their recipes, view others' creations, and engage with the community by liking and commenting on recipes.

## Features

1. **User Authentication**:
   - Sign up and log in to post recipes and interact with others.

2. **Recipe Posting**:
   - Share your favorite recipes, including ingredients, preparation steps, and an optional image.

3. **Explore Recipes**:
   - Browse through a collection of recipes shared by other users.

4. **Like and Comment**:
   - Engage with the community by liking recipes and leaving comments.

5. **Responsive Design**:
   - Enjoy a seamless experience on desktops, tablets, and mobile devices.

## Installation

Follow these steps to set up the project locally:

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or above)
- [MongoDB](https://www.mongodb.com/) (local or cloud-based)
- Git

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/ussyalfaks/recipe-sharing-site.git
   cd recipe-sharing-site
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and configure the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Start the Application**:
   ```bash
   npm start
   ```

5. **Access the Application**:
   Open your browser and navigate to `http://localhost:5000`.

## Technologies Used

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Hosting**: (Optional) Deployed on Vercel/Heroku/AWS

## API Endpoints

### Recipes
- `GET /api/recipes`: Fetch all recipes
- `POST /api/recipes`: Add a new recipe (requires authentication)
- `GET /api/recipes/:id`: Fetch a single recipe
- `PUT /api/recipes/:id/like`: Like a recipe (requires authentication)
- `POST /api/recipes/:id/comments`: Add a comment to a recipe (requires authentication)

### Users
- `POST /api/users/register`: Register a new user
- `POST /api/users/login`: Login a user

## Contribution

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a Pull Request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contact

For questions or suggestions, feel free to reach out:
- ** X **: [usman_alfaki](https://x.com/usman_alfaki)
- **LIVE LINK**: [your-username](https://github.com/your-username)

---

Happy Cooking and Sharing! 🍳
