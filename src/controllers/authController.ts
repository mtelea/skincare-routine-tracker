import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { generateToken } from '../utils/jwt';
import { CustomError } from '../utils/customError';

const prisma = new PrismaClient();

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });
    const token = generateToken(user.id);
    res.status(201).json({ user, token });
  } catch (error) {
    next(new CustomError('User registration failed', 400, error));
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new CustomError('Invalid credentials', 401);
    }
    const token = jwt.sign({ userId: user.id }, 'jwt_secret');
    res.json({ token });
  } catch (error) {
    next(error);
  }
};
