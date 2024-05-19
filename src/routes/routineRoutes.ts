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

/**
 * @swagger
 * /routines:
 *   post:
 *     summary: Create a new routine
 *     tags: [Skincare Routine]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: The routine was successfully created
 */
router.post(
  '/',
  authenticateToken,
  routineValidators,
  validateRequest,
  createRoutine,
);
/**
 * @swagger
 * /routines:
 *   get:
 *     summary: Retrieve a list of routines
 *     tags: [Skincare Routine]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of routines
 */
router.get('/', authenticateToken, getRoutines);

/**
 * @swagger
 * /routines/{id}:
 *   get:
 *     summary: Retrieve a routine by ID
 *     tags: [Skincare Routine]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single routine
 */
router.get(
  '/:id',
  authenticateToken,
  idParamValidator,
  validateRequest,
  getRoutineById,
);

/**
 * @swagger
 * /routines/{id}:
 *   put:
 *     summary: Update a routine by ID
 *     tags: [Skincare Routine]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: The routine was successfully updated
 */
router.put(
  '/:id',
  authenticateToken,
  idParamValidator,
  routineValidators,
  validateRequest,
  updateRoutine,
);

/**
 * @swagger
 * /routines/{id}:
 *   delete:
 *     summary: Delete a routine by ID
 *     tags: [Skincare Routine]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The routine was successfully deleted
 */
router.delete(
  '/:id',
  authenticateToken,
  idParamValidator,
  validateRequest,
  deleteRoutine,
);

export default router;
