import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/profile', authenticateToken, (req, res) => {
  res.json({ message: 'Protected route' });
});

export default router;