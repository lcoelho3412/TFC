import { Router } from 'express';
import MatchesController from '../Controllers/MatchesController';

const router = Router();

router.get('/', MatchesController.getAllMatches);

export default router;
