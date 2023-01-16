import { Router } from 'express';
import TeamsController from '../Controllers/TeamsController';

const router = Router();

router.get('/', TeamsController.getAllTeams);

export default router;
