import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';

// protected routes token base


export const requireSignIn = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.log("No Authorization header provided");
      return res.status(401).send({ success: false, message: 'No token provided' });
    }

    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7, authHeader.length) : authHeader;
    console.log("Received JWT Token:", token);

    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    console.log("Decoded payload:", decoded);

    req.user = decoded; 
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).send({ success: false, message: 'Unauthorized access' });
  }
};


// admin access
export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: 'Unauthorized access',
            });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: 'Error in admin middleware',
        });
    }
};
