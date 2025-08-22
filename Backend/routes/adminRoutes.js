import express from 'express';
import {createUser} from '../controller/userController.js';
import { isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create-user', isAdmin, createUser);

export default router;
