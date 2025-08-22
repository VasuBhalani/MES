import prisma from '../config/prismaClient.js';
import bcrypt from 'bcryptjs';

export const createUser = async (req, res) => {
  try {
    const created_by = req.user?.id || null;
    const {
      username,
      email,
      password,
      first_name,
      last_name,
      phone,
      role_id,
      is_active = true,
    } = req.body;

    console.log(req.body);

    // Check if username or email already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: existingUser.username === username
          ? 'Username already exists'
          : 'Email already exists',
      });
    }

    // Check if role exists
    const roleExists = await prisma.role.findUnique({
      where: { id: parseInt(role_id) },
    });

    if (!roleExists) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role ID',
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        first_name,
        last_name,
        phone: phone || null,
        role_id: parseInt(role_id),
        is_active,
        created_by,
        created_at: new Date(),
        updated_at: new Date(),
      },
      include: {
        role: { select: { id: true, role_name: true } },
        creator: {
          select: {
            id: true,
            username: true,
            first_name: true,
            last_name: true,
          },
        },
      },
    });

    // Don't send password in response
    const { password: _, ...userData } = newUser;

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: userData,
    });

  } catch (error) {
    console.error('Error creating user:', error);

    if (error.code === 'P2002') {
      return res.status(409).json({
        success: false,
        message: 'Username or email already exists',
      });
    }

    if (error.code === 'P2003') {
      return res.status(400).json({
        success: false,
        message: 'Invalid role or creator ID',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};