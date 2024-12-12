import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
  try {
    // Retrieve token from the Authorization header or cookies
    const token =
      req.header('Authorization')?.replace('Bearer ', '') || req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'JWT_SECRET');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
