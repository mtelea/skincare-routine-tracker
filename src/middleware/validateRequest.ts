import { Request, Response, NextFunction } from 'express';
import { validationResult, body, param } from 'express-validator';
import { CustomError } from '../utils/customError';

interface ExtractedErrors {
  [key: string]: string;
}

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors: ExtractedErrors = {};
    const mappedErrors = errors.mapped();
    for (const key in mappedErrors) {
      if (Object.prototype.hasOwnProperty.call(mappedErrors, key)) {
        extractedErrors[key] = mappedErrors[key].msg;
      }
    }
    return next(new CustomError('Validation failed', 400, extractedErrors));
  }
  next();
};

export const userValidators = [
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Email is invalid'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

export const loginValidators = [
  body('email').isEmail().withMessage('Email is invalid'),
  body('password').notEmpty().withMessage('Password is required'),
];

export const productValidators = [
  body('name').notEmpty().withMessage('Name is required'),
  body('type').optional().isString().withMessage('Type must be a string'),
  body('ingredients')
    .optional()
    .isString()
    .withMessage('Ingredients must be a string'),
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),
];

export const routineValidators = [
  body('userId').isInt().withMessage('User ID must be an integer'),
  body('name').notEmpty().withMessage('Name is required'),
  body('productIds').isArray().withMessage('Product IDs must be an array'),
];

export const idParamValidator = [
  param('id').isInt().withMessage('ID must be an integer'),
];
