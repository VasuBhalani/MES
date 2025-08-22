import jwt from 'jsonwebtoken';
import prisma from '../config/prismaClient.js';
import { v4 as uuidv4 } from 'uuid';
import { comparePassword,hashPassword} from '../utils/hashUtils.js'; // bcrypt compare


// Utility: Generate a unique user ID (if needed for frontend)
const generateUserId = () => `user_${uuidv4().replace(/-/g, '').substring(0, 12)}`;

// Utility: Generate username from name or fallback
const generateUsername = (firstName = '', lastName = '', email = '') => {
  let prefix = '';
  if (firstName.length >= 2) prefix += firstName.slice(0, 2);
  if (lastName.length >= 2) prefix += lastName.slice(0, 2);
  if (!prefix && email) prefix = email.slice(0, 4);
  if (!prefix) prefix = 'user';
  return `${prefix.toLowerCase()}_${uuidv4().slice(0, 6)}`;
};

// JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

const loginUser = async (email, password) => {
  try {
    console.log(email);
    const user = await prisma.user.findUnique({
      where: { email },
      include: { role: true }
    });
    // console.log("hello");
    console.log('...authapi',user);
    if (!user) throw new Error('Invalid credentials');

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = generateToken(user.id); // or user.email

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role.role_name, // Optional
      },
      token,
    };
  } catch (error) {
    throw error;
  }
};

const createUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password, role_id, phone } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await hashPassword(password);
    const username = generateUsername(first_name, last_name);

    const newUser = await prisma.user.create({
      data: {
        first_name,
        last_name,
        email,
        phone,
        username,
        password: hashedPassword,
        role_id,
        created_by: req.user.userId, // From token (admin)
      },
    });

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create user' });
  }
};

export default {loginUser,createUser};