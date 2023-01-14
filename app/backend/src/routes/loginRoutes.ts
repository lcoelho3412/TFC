import { Router } from 'express';
import UserController from '../Controllers/UserControllers';

const router = Router();

router.post('/', UserController.login);

export default router;
