import jwt from 'jsonwebtoken';
// import { prisma } from '../generated/prisma/index.js'; // Adjust your path
import prisma from '../config/prismaClient.js';
import dotenv from 'dotenv';
dotenv.config();

export const isAuthenticate = async (req, res, next) => {
  try {
     const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { role: true } // so you have role_name in req
    });

    if (!user || !user.is_active) {
      return res.status(401).json({ message: 'User not found or inactive' });
    }

    // Attach user to request
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role.role_name
    };

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log(token);
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Now decoded.role will contain the user's role
    // console.log('Decoded',decoded);
     
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { role: true } // so you have role_name in req
    });

    // console.log(user);
    if (user?.role.role_name !== 'Admin') {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }
    req.user = decoded; // Attach decoded info to req
    // console.log(req.user);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `User role ${req.user.role} is not authorized to access this route`,
      });
    }
    next();
  };
};