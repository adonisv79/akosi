import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { UserActivitiesService } from 'src/user-activities/user-activities.service';
import { UsersModule } from 'src/users/users.module';
import { UserProfilesService } from 'src/users/profiles/user-profiles.service';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    UserActivitiesService,
    UserProfilesService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
