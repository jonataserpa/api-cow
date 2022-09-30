import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { MessagesHelper } from 'src/config/constants/messages.helpers';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'username' });
  }

  async validate(email: string, password: string) {
    const user = await this.authService.validateCredentials(email, password);

    if (!user)
      throw new UnauthorizedException(MessagesHelper.PASSWORD_OR_EMAIL_INVALID);

    return user;
  }
}
