import { Request, Response } from 'express';
import UserService from '../service/UserService';

class UserController {
  static async login(req: Request, res: Response) {
    const token = await UserService.login(req.body);
    if (token === 'Incorrect email or password') {
      return res.status(401).json({ message: token });
    }
    return res.status(200).json({ token });
  }
}

export default UserController;
