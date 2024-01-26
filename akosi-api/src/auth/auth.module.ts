import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { AuthSessionController } from './sessions/auth-session.controller';
import { UserActivitiesService } from 'src/user-activities/user-activities.service';
import { ErrorHandlerService } from 'src/errors/error-handler.service';
import { AuthSessionService } from './sessions/auth-session.service';

@Module({
  controllers: [AuthController, AuthSessionController],
  providers: [
    AuthService,
    AuthSessionService,
    ErrorHandlerService,
    PrismaService,
    UserActivitiesService,
  ],
})
export class AuthModule {}
