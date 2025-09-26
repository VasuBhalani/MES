import express from 'express';
import {createUser,getAllUsers,updateUser} from '../controller/userController.js';
import { isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create-user', isAdmin, createUser);
router.get('/getusers', isAdmin, getAllUsers);
router.put('/update-user', isAdmin, updateUser);

export default router;
