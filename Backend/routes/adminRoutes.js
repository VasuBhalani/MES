import express from 'express';
import {createUser,getAllUsers} from '../controller/userController.js';
import { isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create-user', isAdmin, createUser);
router.get('/getusers', isAdmin, getAllUsers);

export default router;
