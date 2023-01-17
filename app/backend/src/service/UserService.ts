import { compareSync } from 'bcryptjs';
import { JwtPayload } from 'jsonwebtoken';
import ILogin from '../interfaces/ILogin';
import TokenValidation from '../utils/jwt';
import User from '../database/models/User';

export default class UserService {
  static async login(login: ILogin): Promise<string> {
    const user = await User.findOne({ where: { email: login.email } });
    if (!user) {
      return 'Incorrect email or password';
    }
    if (!(compareSync(login.password, user.password))) {
      return 'Incorrect email or password';
    }
    const token = TokenValidation.tokenGenerator(login);
    return token;
  }

  static async role(token: string) {
    const tokenTranslated = TokenValidation.tokenDecoder(token) as JwtPayload;
    const user = await User.findOne({ where: { email: tokenTranslated.email } });
    return user?.role;
  }
}
