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

export const getAllUsers = async (req, res) => {
  console.log('heelo req : -',req.user);
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        is_active: true,
        role: {
          select: {
            role_name: true,
          },
        },
      },
       orderBy: {
        created_at: "desc", 
       }
    });

    // format response
    const formattedUsers = users.map(user => ({
      id: user.id,
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      is_active: user.is_active,
      role_name: user.role.role_name,
    }));

    console.log('Fetched users:', formattedUsers);
    res.status(200).json({
      success: true,
      data: formattedUsers,
    });

  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        first_name: true,
        last_name: true,
        phone: true,
        is_active: true,
        role: {
          select: {
            id: true,
            role_name: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });

  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export const deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    await prisma.user.delete({ where: { id } });

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });

  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export const updateUser = async (req, res) => { 
  try {
    const { userId, role_id, is_active, ...otherData } = req.body;
    console.log("Update payload:", req.body);

    if (!userId) {
      return res.status(400).json({ error: "userId is required." });
    }

    // Start building update object
    const dataToUpdate = {
      ...otherData,
    };

     
    // Update is_active if provided
      if (typeof is_active !== "undefined") {
        dataToUpdate.is_active = is_active ? true : false;
      }

      console.log("Data to update:", dataToUpdate);

    // Handle role relation update properly
    if (role_id) {
      dataToUpdate.role = {
        connect: { id: Number(role_id) },
      };
    }

    const updatedUser = await prisma.user.update({
      where: { id: Number(userId) },
      data: dataToUpdate,
    });

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
