import { Router } from 'express';
import MatchesController from '../Controllers/MatchesController';

const router = Router();

router.get('/', MatchesController.getAllMatches);
router.post('/', MatchesController.createMatch);

export default router;
