import { compareSync } from 'bcryptjs';
import ILogin from '../interfaces/ILogin';
import TokenValidation from '../utils/jwt';
import User from '../database/models/User';
// import IUser from '../interfaces/IUser';

export default class UserService {
  static async login(login: ILogin): Promise<string> {
    const user = await User.findOne({ where: { email: login.email } });
    if (!user) {
      return 'Incorrect email or password';
    }
    if (!(compareSync(login.password, user.password))) {
      console.log('file: UserService.ts:14 ~ UserService ~ login ~ user', user);
      return 'Incorrect email or password';
    }
    const token = TokenValidation.tokenGenerator(login);
    return token;
  }
}
