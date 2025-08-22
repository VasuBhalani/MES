import express from 'express';
import { getMe, login,logout } from '../controller/authController.js';
// import bcrypt from 'bcryptjs';
const router = express.Router();

//  const hashedPassword = await bcrypt.hash("1234", 12);
//  console.log('pass:',hashedPassword);
router.get('/me',getMe);
router.post('/login', login);
router.post('/logout', logout);

export default router;
