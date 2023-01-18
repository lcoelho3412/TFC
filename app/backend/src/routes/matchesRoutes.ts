import { Router } from 'express';
import matchValidator from '../middleware/MatchValidMiddleware';
import MatchesController from '../Controllers/MatchesController';

const router = Router();

router.get('/', MatchesController.getAllMatches);
router.post('/', matchValidator, MatchesController.createMatch);
router.patch('/:id/finish', MatchesController.editMatch);

export default router;
