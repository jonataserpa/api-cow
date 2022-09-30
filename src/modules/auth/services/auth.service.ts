import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { MessagesHelper } from 'src/config/constants/messages.helpers';
// import { HttpService } from '@nestjs/axios';
// import { firstValueFrom } from 'rxjs';

const users = [
  {
    id: 1,
    username: 'user1@user.com',
    password: '$2b$10$EecWnvyBtN4ttSJWILAjs.lnOfVejB7ABCxWGLS0OUCEcbcnwTu5K', //123456
    role: 'admin',
  },
  {
    id: 2,
    username: 'user2@user.com',
    password: '$2b$10$EecWnvyBtN4ttSJWILAjs.lnOfVejB7ABCxWGLS0OUCEcbcnwTu5K',
    role: 'user',
  },
  {
    id: 3,
    username: 'user3@user.com',
    password: '$2b$10$EecWnvyBtN4ttSJWILAjs.lnOfVejB7ABCxWGLS0OUCEcbcnwTu5K',
    role: 'user',
  },
];
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  // constructor(private http: HttpService) {}

  // async login(username: string, password: string) {
  //   // const data = this.validateCredentials(username, password);
  //   const { data } = await firstValueFrom(
  //     this.http.post(
  //       'http://host.docker.internal:8083/auth/realms/App_finances/protocol/openid-connect/token',
  //       new URLSearchParams({
  //         client_id: 'app_nestjs_finances',
  //         client_secret: 'f0f47399-0493-433e-8a69-8d71e89b570f',
  //         grant_type: 'password',
  //         username,
  //         password,
  //       }),
  //     ),
  //   );
  //   return data;
  // }

  login(username: string, password: string) {
    const user = this.validateCredentials(username, password);

    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    };

    return this.jwtService.sign(payload);
  }

  validateCredentials(username: string, password: string) {
    const user = users.find(
      (u) =>
        u.username === username && bcrypt.compareSync(password, u.password),
    );

    if (!user) {
      throw new UnauthorizedException(MessagesHelper.PASSWORD_OR_EMAIL_INVALID);
    }

    return user;
  }
}
