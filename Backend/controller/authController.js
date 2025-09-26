import authService from '../services/authService.js';
import jwt from 'jsonwebtoken';
import prisma from '../config/prismaClient.js';

import bcrypt from 'bcryptjs';
 const hashedPassword = await bcrypt.hash("123456", 12);

export const login = async (req, res) => {
  try {
    console.log('pass:',hashedPassword);
    // console.log(req.cookies.token);
    const { email, password } = req.body;
    console.log("backend : ",req.body);
    const result = await authService.loginUser(email, password);
    console.log('res',result);

    res.cookie("token", result.token, {
      httpOnly: true,
      secure: false, // use true in production (HTTPS)
      sameSite: "lax"
    });

    res.status(200).json({
      success: true,
      data: result.user,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = (req, res) => {
  res.clearCookie('token');
  res.json({ success: true, message: 'Logged out' });
};

export const getMe = async (req, res) => {
  try {
    const token = req.cookies.token;
    console.log('getMe me cookie ',token);
    if (!token) return res.status(401).json({ success: false, message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('decoded',decoded);
    const user = await prisma.user.findUnique({ where: { id: decoded.userId }, include: { role: true } });
    console.log('user',user); 
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.status(200).json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role.role_name,
      }
    });
  } catch (err) {
    console.log('err',err);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};
