import { Router } from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/productController';
import {
  productValidators,
  idParamValidator,
  validateRequest,
} from '../middleware/validateRequest';
import { authenticateToken } from '../middleware/authMiddleware';
import upload from '../middleware/upload';

const router = Router();

router.post(
  '/',
  authenticateToken,
  upload.single('image'),
  productValidators,
  validateRequest,
  createProduct,
);

router.get('/', authenticateToken, getProducts);
router.get(
  '/:id',
  authenticateToken,
  idParamValidator,
  validateRequest,
  getProductById,
);

router.put(
  '/:id',
  authenticateToken,
  upload.single('image'),
  idParamValidator,
  productValidators,
  validateRequest,
  updateProduct,
);

router.delete(
  '/:id',
  authenticateToken,
  idParamValidator,
  validateRequest,
  deleteProduct,
);

export default router;
