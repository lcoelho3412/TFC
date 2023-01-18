import { Router } from 'express';
import MatchesController from '../Controllers/MatchesController';

const router = Router();

router.get('/', MatchesController.getAllMatches);
router.post('/', MatchesController.createMatch);
router.patch('/:id/finish', MatchesController.editMatch);

export default router;
