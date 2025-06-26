import express from 'express';
import { chatHandler, listModelsHandler } from '../handlers/chatHandler';
import { authenticateApiKey } from '../../../core/auth/apiKeyAuth';

const router = express.Router();

/**
 * @swagger
 * /api/v1/models:
 *   get:
 *     summary: List available AI models from OpenAI
 *     tags: [Chat]
 *     responses:
 *       200:
 *         description: List of available models
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: gpt-4
 *                       object:
 *                         type: string
 *                         example: model
 */
router.get('/models', listModelsHandler);

/**
 * @swagger
 * /api/v1/chat/completions:
 *   post:
 *     summary: Generate a chat completion using OpenAI
 *     tags: [Chat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChatCompletionRequestDto'
 *     responses:
 *       200:
 *         description: Chat completion response from OpenAI
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChatCompletionResponseDto'
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 */
router.post('/chat/completions', chatHandler);

export default router;
