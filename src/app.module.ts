import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventModule } from './event/event.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/ns8'),
    AuthModule,
    EventModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
