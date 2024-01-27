import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { UserActivitiesService } from 'src/user-activities/user-activities.service';
import { ErrorHandlerService } from 'src/errors/error-handler.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [UsersModule, PassportModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    ErrorHandlerService,
    PrismaService,
    UserActivitiesService,
  ],
})
export class AuthModule {}
