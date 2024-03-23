import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma.service';
import { UserHistoriesController } from './histories/user-histories.controller';
import { UserHistoriesService } from './histories/user-histories.service';
import { UserProfilesController } from './profiles/user-profiles.controller';
import { UserProfilesService } from './profiles/user-profiles.service';

@Module({
  controllers: [
    UsersController,
    UserHistoriesController,
    UserProfilesController,
  ],
  providers: [
    PrismaService,
    UsersService,
    UserHistoriesService,
    UserProfilesService,
  ],
  exports: [UsersService, UserHistoriesService, UserProfilesService],
})
export class UsersModule {}
