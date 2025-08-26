import express from 'express';
import { getMe, login,logout } from '../controller/authController.js';
import { sendOtp, verifyOtp,updatePassword} from '../controller/otpController.js';
const router = express.Router();

// import bcrypt from 'bcryptjs';
//  const hashedPassword = await bcrypt.hash("1234", 12);
//  console.log('pass:',hashedPassword);

router.get('/me',getMe);
router.post('/login', login);
router.post('/logout', logout);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post('/update-password',updatePassword );

export default router;
