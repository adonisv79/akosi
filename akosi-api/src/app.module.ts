import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { UsersService } from './users/users.service';
import { PrismaService } from './prisma.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports:  [ConfigModule.forRoot({ isGlobal: true, load: [configuration], })],
  controllers: [AppController, AuthController, UsersController],
  providers: [AppService, AuthService, PrismaService, UsersService],
})
export class AppModule {}
