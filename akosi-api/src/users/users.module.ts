import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { PrismaService } from "src/prisma.service";
import { ErrorHandlerService } from "src/errors/error-handler.service";

@Module({
  controllers: [ UsersController ],
  providers: [ ErrorHandlerService, UsersService, PrismaService ],
  exports: [ UsersService ]
})
export class UsersModule {}