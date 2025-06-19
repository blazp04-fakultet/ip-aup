import express from 'express';
import {
  getReacentActivity,
  getSummary,
  getUsedModels,
} from '../handlers/analyticsHandler';

const router = express.Router();

/**
 * @swagger
 * /api/v1/analytics/summary:
 *   get:
 *     summary: Get analytics summary
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Analytics summary retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/SummaryDTO'
 *       404:
 *         description: Summary not found
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
 *                   example: Summary not found
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
 *                   example: Failed to retrieve summary
 *                 error:
 *                   type: string
 *                   example: Unknown error
 */
router.get('/summary', getSummary);

/**
 * @swagger
 * /api/v1/analytics/used-models:
 *   post:
 *     summary: Get used models analytics
 *     tags: [Analytics]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ModelUsageListRequestDto'
 *     responses:
 *       200:
 *         description: Used models list retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/ModelUsageListDto'
 *       404:
 *         description: Used models not found
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
 *                   example: Used models not found
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
 *                   example: Failed to retrieve used models
 *                 error:
 *                   type: string
 *                   example: Unknown error
 */
router.post('/used-models', getUsedModels);

/**
 * @swagger
 * /api/v1/analytics/recent-activity:
 *   post:
 *     summary: Get recent activity analytics
 *     tags: [Analytics]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ActivityListRequestDto'
 *     responses:
 *       200:
 *         description: Recent activity list retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/ActivityListDto'
 *       404:
 *         description: Recent activity not found
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
 *                   example: Recent activity not found
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
 *                   example: Failed to retrieve recent activity
 *                 error:
 *                   type: string
 *                   example: Unknown error
 */
router.post('/recent-activity', getReacentActivity);

export default router;
