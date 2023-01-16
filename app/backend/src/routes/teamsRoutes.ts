import { Router } from 'express';
import TeamsController from '../Controllers/TeamsController';

const router = Router();

router.get('/', TeamsController.getAllTeams);
router.get('/:id', TeamsController.getById);

export default router;
