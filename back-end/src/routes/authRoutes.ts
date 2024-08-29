import express from 'express';
import { register, login, tokenRefresh } from '../controllers/authController';

const router = express.Router();

router.post('/register', register);
router.post('/refresh-token', tokenRefresh);
router.post('/login', login);

export default router;
