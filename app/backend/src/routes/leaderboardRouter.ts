import { Router } from 'express';
import LeaderboardController from '../Controllers/LeaderboardController';

const router = Router();

router.get('/home', LeaderboardController.getHomeLeaderboard);
router.get('/away', LeaderboardController.getAwayLeaderboard);
router.get('/', LeaderboardController.getLeaderboard);

export default router;
