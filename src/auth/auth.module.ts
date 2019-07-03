import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: 'abracadabra',
      signOptions: {
        expiresIn: 604800, // one week
      },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule, AuthService],
})
export class AuthModule {}
