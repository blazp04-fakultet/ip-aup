import express from 'express';
import { getBalance, addBalance } from '../handlers/balanceHandler';

const router = express.Router();

/**
 * @swagger
 * /api/v1/balance:
 *   get:
 *     summary: Get current account balance
 *     tags: [Balance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account balance retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/AccountBalanceDTO'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Failed to retrieve balance
 *                 error:
 *                   type: string
 *                   example: Unknown error
 */
router.get('/', getBalance);

/**
 * @swagger
 * /api/v1/balance/add:
 *   post:
 *     summary: Add funds to account balance
 *     tags: [Balance]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddFundsRequest'
 *     responses:
 *       200:
 *         description: Funds added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/AccountBalanceDTO'
 *       400:
 *         description: Bad request - Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid input data
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Failed to add balance
 *                 error:
 *                   type: string
 *                   example: Unknown error
 */
router.post('/add', addBalance);

export default router;
