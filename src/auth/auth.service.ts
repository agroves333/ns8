import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email, password): Promise<any> {
    const user = await this.userService.findOneByEmail(email);

    user.comparePassword(password, (error, match) => {
      if (!match || !user) {
        return new UnauthorizedException();
      }
    });
    await this.userService.createUserEvent(email, 'LOGIN');
    const payload: JwtPayload = { email };
    return this.jwtService.sign(payload);
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.userService.findOneByEmail(payload.email);
  }
}
