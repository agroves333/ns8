import { Controller, Post, Body } from '@nestjs/common';
import { CredsDto } from './dto/creds.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() creds: CredsDto) {
    return await this.authService.login(creds.email, creds.password);
  }
}
