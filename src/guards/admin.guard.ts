import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { AuthService } from '../../src/auth/auth.service';
import { UsersService } from '../../src/users/users.service';

@Injectable()
export class AdminGuard implements CanActivate {
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
      if (data.role !== Role.ADMIN) {
        throw new UnauthorizedException('Access Denied!');
      }
      const user = await this.usersService.findOne(data.sub);
      request.user = user;
    } catch (err) {
      throw new UnauthorizedException('Access Denied!');
    }
    return true;
  }
}
