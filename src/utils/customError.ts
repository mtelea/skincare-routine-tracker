import { Request, Response, NextFunction } from 'express';

export class CustomError extends Error {
  status: number;
  details: any;

  constructor(message: string, status: number, details?: any) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  const details = err.details || null;
  res.status(status).json({ message, details });
};
