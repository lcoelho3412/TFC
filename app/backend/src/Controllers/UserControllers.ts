import { Request, Response } from 'express';
import UserService from '../service/UserService';

class UserController {
  static async login(req: Request, res: Response) {
    const loginStatus = await UserService.login(req.body);
    res.status(200).json(loginStatus);
  }
}

export default UserController;
