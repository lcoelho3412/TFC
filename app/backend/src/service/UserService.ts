import ILogin from '../interfaces/ILogin';
import TokenValidation from '../utils/jwt';
import User from '../database/models/User';

export default class UserService {
  static async login(login: ILogin): Promise<string> {
    const user = await User.findOne({ where: { email: login.email } });
    if (!user) {
      throw new Error();
    }
    const token = TokenValidation.tokenGenerator(login);
    return token;
  }
}
