import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { CustomError } from '../utils/customError';

const prisma = new PrismaClient();

export const createRoutine = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { userId, name, description, productIds } = req.body;
  try {
    const routine = await prisma.routine.create({
      data: {
        userId,
        name,
        description,
        products: {
          create: productIds.map((productId: number) => ({ productId })),
        },
      },
    });
    res.status(201).json(routine);
  } catch (error) {
    next(new CustomError('Routine creation failed', 400, error));
  }
};

export const getRoutines = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const name = req.query.name as string;
    const routines = await prisma.routine.findMany({
      where: { name: { contains: name || '' } },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });
    res.json(routines);
  } catch (error) {
    next(new CustomError('Failed to retrieve routines', 500, error));
  }
};

export const getRoutineById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    const routine = await prisma.routine.findUnique({
      where: { id: parseInt(id, 10) },
      include: { products: true },
    });
    if (!routine) {
      throw new CustomError('Routine not found', 404);
    }
    res.json(routine);
  } catch (error) {
    next(error);
  }
};

export const updateRoutine = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const { name, description, productIds } = req.body;
  try {
    const routine = await prisma.routine.update({
      where: { id: parseInt(id, 10) },
      data: {
        name,
        description,
        products: {
          deleteMany: {},
          create: productIds.map((productId: number) => ({ productId })),
        },
      },
    });
    res.json(routine);
  } catch (error) {
    next(new CustomError('Routine update failed', 400, error));
  }
};

export const deleteRoutine = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    await prisma.routine.delete({ where: { id: parseInt(id, 10) } });
    res.status(204).send();
  } catch (error) {
    next(new CustomError('Routine deletion failed', 400, error));
  }
};
