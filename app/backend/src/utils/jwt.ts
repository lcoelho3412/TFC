import { sign, verify } from 'jsonwebtoken';
import ILogin from '../interfaces/ILogin';
import 'dotenv/config';

export default class TokenValidation {
  static tokenGenerator(data: ILogin): string {
    const jwtSecret = process.env.JWT_SECRET || 'jwt_secret';
    return sign(data, jwtSecret, { expiresIn: '1d', algorithm: 'HS256' });
  }

  static tokenDecoder(token: string) {
    const jwtSecret = process.env.JWT_SECRET || 'jwt_secret';
    const decodedToken = verify(token, jwtSecret);
    return decodedToken;
  }

  static tokenValidator(token: string) {
    const jwtSecret = process.env.JWT_SECRET || 'jwt_secret';
    try {
      const data = verify(token, jwtSecret);
      return data;
    } catch (error) {
      return 'Unauthorized';
    }
  }
}
