import { Router } from 'express';
import { playGame } from '../controllers/gameController';
import { resetGame } from '../controllers/gameController';

const router = Router();

router.post('/play', playGame);
router.post('/reset', resetGame);

export default router;
