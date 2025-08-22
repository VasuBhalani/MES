import authService from '../services/authService.js';
import jwt from 'jsonwebtoken';
import prisma from '../config/prismaClient.js';
// const register = async (req, res) => {
//   try {
//     const userData = {
//     username: req.body.username,
//     name: req.body.name, 
//     email: req.body.email,
//     password: req.body.password,
//     role: req.body.role || 'user',
//   };


//     const result = await authService.registerUser(userData);

//     res.status(201).json({
//       success: true,
//       data: result,
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

export const login = async (req, res) => {
  try {
    // console.log(req.cookies.token);
    const { email, password } = req.body;
    // console.log("backend : ",req.body);
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
