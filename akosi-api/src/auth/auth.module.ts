import { Module } from "@nestjs/common";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./auth.service";
import { PrismaService } from "src/prisma.service";
import { AuthSessionController } from "./controllers/auth-session.controller";
import { UserActivitiesService } from "src/user-activities/user-activities.service";

@Module({
  controllers: [AuthController, AuthSessionController],
  providers: [AuthService, PrismaService, UserActivitiesService]
})
export class AuthModule {}