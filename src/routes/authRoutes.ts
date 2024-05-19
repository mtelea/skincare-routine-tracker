import { Router } from 'express';
import { register, login } from '../controllers/authController';
import {
  userValidators,
  loginValidators,
  validateRequest,
} from '../middleware/validateRequest';

const router = Router();

router.post('/register', userValidators, validateRequest, register);

router.post('/login', loginValidators, validateRequest, login);

export default router;
