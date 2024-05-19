import { Router } from 'express';
import {
  createRoutine,
  getRoutines,
  getRoutineById,
  updateRoutine,
  deleteRoutine,
} from '../controllers/routineController';
import {
  routineValidators,
  idParamValidator,
  validateRequest,
} from '../middleware/validateRequest';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.post(
  '/',
  authenticateToken,
  routineValidators,
  validateRequest,
  createRoutine,
);
router.get('/', authenticateToken, getRoutines);
router.get(
  '/:id',
  authenticateToken,
  idParamValidator,
  validateRequest,
  getRoutineById,
);
router.put(
  '/:id',
  authenticateToken,
  idParamValidator,
  routineValidators,
  validateRequest,
  updateRoutine,
);
router.delete(
  '/:id',
  authenticateToken,
  idParamValidator,
  validateRequest,
  deleteRoutine,
);

export default router;
