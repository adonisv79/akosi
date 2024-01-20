import { Module } from "@nestjs/common";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./auth.service";
import { PrismaService } from "src/prisma.service";
import { AuthSessionController } from "./controllers/auth-session.controller";

@Module({
  controllers: [AuthController, AuthSessionController],
  providers: [AuthService, PrismaService]
})
export class AuthModule {}