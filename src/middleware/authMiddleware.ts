import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomError } from '../utils/customError';

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return next(new CustomError('Access denied, token missing', 401));
  }

  jwt.verify(token, 'jwt_secret', (err: any, user: any) => {
    if (err) {
      return next(new CustomError('Invalid token', 403));
    }
    req.user = user;
    next();
  });
};
