import { Router } from 'express';
import UserValidator from '../middleware/LoginMiddleware';
import UserController from '../Controllers/UserControllers';

const router = Router();

router.post('/', UserValidator.loginValidator, UserController.login);
router.get('/validate', UserController.validate);

export default router;
