import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma.service';
import { UserHistoriesController } from './histories/user-histories.controller';
import { UserHistoriesService } from './histories/user-histories.service';

@Module({
  controllers: [UsersController, UserHistoriesController],
  providers: [UsersService, PrismaService, UserHistoriesService],
  exports: [UsersService],
})
export class UsersModule {}
