import express from 'express';
import { getUser } from '../handlers/userHandler';

const router = express.Router();

router.get('/', getUser);
export default router;
