import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { UsersService } from './users/users.service';

@Module({
  imports:  [ConfigModule.forRoot({ isGlobal: true, load: [configuration], })],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {}
