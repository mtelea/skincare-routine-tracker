import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { CustomError } from '../utils/customError';
import { MulterFile } from '../middleware/upload';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, type, ingredients, description } = req.body;
  const image = (req.file as MulterFile)?.path;
  try {
    const product = await prisma.product.create({
      data: { name, type, ingredients, description, image },
    });
    res.status(201).json(product);
  } catch (error) {
    next(new CustomError('Product creation failed', 400, error));
  }
};

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;

  try {
    const products = await prisma.product.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const totalProducts = await prisma.product.count();
    const totalPages = Math.ceil(totalProducts / pageSize);

    res.json({
      products,
      page,
      pageSize,
      totalPages,
      totalProducts,
    });
  } catch (error) {
    next(new CustomError('Failed to retrieve products', 500, error));
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id, 10) },
    });
    if (!product) {
      throw new CustomError('Product not found', 404);
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params; // Ensure the ID is required in the URL
  const { name, type, ingredients, description } = req.body;
  let image = req.file ? (req.file as MulterFile)?.path : req.body.image;

  if (!id) {
    return next(new CustomError('Product ID is required', 400));
  }

  try {
    const existingProduct = await prisma.product.findUnique({
      where: { id: parseInt(id, 10) },
    });
    if (!existingProduct) {
      throw new CustomError('Product not found', 404);
    }

    if (image === null || image === 'null') {
      // Delete the existing image file if it exists
      if (existingProduct.image) {
        const imagePath = path.join(
          __dirname,
          '../../uploads',
          path.basename(existingProduct.image),
        );
        console.log(`Attempting to delete image: ${imagePath}`);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
          console.log(`Deleted image: ${imagePath}`);
        } else {
          console.log(`Image not found: ${imagePath}`);
        }
      }
      image = null;
    }

    const product = await prisma.product.update({
      where: { id: parseInt(id, 10) },
      data: { name, type, ingredients, description, image },
    });
    res.json(product);
  } catch (error) {
    next(new CustomError('Product update failed', 400, error));
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    const existingProduct = await prisma.product.findUnique({
      where: { id: parseInt(id, 10) },
    });
    if (!existingProduct) {
      throw new CustomError('Product not found', 404);
    }

    if (existingProduct.image) {
      const imagePath = path.join(
        __dirname,
        '../../uploads',
        path.basename(existingProduct.image),
      );
      console.log(`Attempting to delete image: ${imagePath}`);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        console.log(`Deleted image: ${imagePath}`);
      } else {
        console.log(`Image not found: ${imagePath}`);
      }
    }

    await prisma.product.delete({ where: { id: parseInt(id, 10) } });
    res.status(204).send();
  } catch (error) {
    next(new CustomError('Product deletion failed', 400, error));
  }
};
