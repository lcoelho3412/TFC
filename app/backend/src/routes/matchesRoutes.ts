import { Router } from 'express';
import matchValidator from '../middleware/MatchValidMiddleware';
import MatchesController from '../Controllers/MatchesController';
import TokenValid from '../middleware/TokenValidMiddleware';

const router = Router();

router.get('/', MatchesController.getAllMatches);
router.post('/', TokenValid.validateMatchToken, matchValidator, MatchesController.createMatch);
router.patch('/:id/finish', MatchesController.editMatch);

export default router;
