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

  static async validate(req: Request, res: Response) {
    const { authorization } = req.headers;
    const role = await UserService.role(authorization as string);
    return res.status(200).json({ role });
  }
}

export default UserController;
