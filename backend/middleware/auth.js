import User from "../models/User.js";
import jwt from 'jsonwebtoken';

const protect = async (req, res, next) => {
  let token;

  // FIX 1: `authorizaion` → `authorization`
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // FIX 2: `JsonWebTokenError.verify` → `jwt.verify`
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: 'User not found',
          statusCode: 401
        });
      }

      next();

    } catch (error) {
      // FIX 3: actually return error response instead of silently failing
      console.error('Token error:', error.message);
      return res.status(401).json({
        success: false,
        error: 'Not authorized, token failed',
        statusCode: 401
      });
    }

  } else {
    // FIX 3: handle missing token case
    return res.status(401).json({
      success: false,
      error: 'Not authorized, no token',
      statusCode: 401
    });
  }
};

export default protect;