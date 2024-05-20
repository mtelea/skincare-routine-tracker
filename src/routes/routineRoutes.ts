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
 *         description: The routine was successfully created. Returns created resource
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
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
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: The name of the routine to search for. (contains)
 *         required: false
 *     responses:
 *       200:
 *         description: A list of routines.
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
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
 *         description: A single routine by id
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
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
 *       401:
 *         description: Unauthorized
 *       403:
 *        description: Forbidden
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
 *       204:
 *         description: The routine was successfully deleted
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.delete(
  '/:id',
  authenticateToken,
  idParamValidator,
  validateRequest,
  deleteRoutine,
);

export default router;
