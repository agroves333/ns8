import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
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
    let valid = true;
    if (user) {
      user.comparePassword(password, (error, match) => {
        if (!match) {
          valid = false;
        }
      });
    } else {
      valid = false;
    }
    if (!valid) {
      throw new HttpException({
        status: HttpStatus.UNAUTHORIZED,
        error: 'Email or password is invalid',
      }, 401);
    }
    await this.userService.createUserEvent(email, 'LOGIN');
    const payload: JwtPayload = {
      id: user.id,
      email,
    };
    return {
      token: this.jwtService.sign(payload),
      id: user.id,
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.userService.findOneByEmail(payload.email);
  }
}
