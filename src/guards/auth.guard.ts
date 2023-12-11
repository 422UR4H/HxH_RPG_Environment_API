import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
// import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    try {
      const data = this.authService.checkToken(
        authorization.split(' ')[1] ?? '',
      );
      // .split(' '[1]);
      const user = await this.usersService.findOne(data.sub);
      request.user = user;
    } catch (err) {
      throw new UnauthorizedException('Access Denied!');
    }
    return true;
  }
}
