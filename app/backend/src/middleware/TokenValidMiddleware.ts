import { Response, Request, NextFunction } from 'express';
import TokenValidation from '../utils/jwt';

export default class TokenValid {
  static async validateMatchToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const authorized = TokenValidation.tokenValidator(authorization as string);
    if (authorized === 'Unauthorized') {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    next();
  }
}
