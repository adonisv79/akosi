import {
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersParamsDto } from '../dto/users.dto';
import { CreateUserProfileBody } from './user-profiles.dto';
import { PrismaService } from 'src/prisma.service';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class UserProfilesService {
  constructor(
    @Inject(REQUEST) private readonly req: Request,
    private prisma: PrismaService,
  ) {}

  private isUserIdCurrentUser(param: UsersParamsDto) {
    return this.req.user?.id === param.userId;
  }

  async addUserProfile(param: UsersParamsDto, body: CreateUserProfileBody) {
    try {
      this.req.logger.log(`Adding profile for userid:${param.userId}`);
      if (!this.isUserIdCurrentUser(param)) {
        this.req.logger.warn(
          `User with id#${this.req.user.id} attempted to access user with id#${param.userId}'s profiles`,
        );
        throw new ForbiddenException();
      }
      const user = await this.prisma.user.findFirst({
        select: { id: true, profiles: true },
        where: { id: param.userId },
      });
      if (!user) {
        this.req.logger.warn(
          `User with id#${this.req.user.id} has active session but has no user record`,
        );
        throw new UnauthorizedException();
      }

      const isPrimary = user.profiles.length === 0;

      return await this.prisma.userProfile.create({
        data: {
          isPrimary,
          userId: user.id,
          givenName: body.givenName,
          middleName: body.middleName,
          surname: body.surname,
          patronymicName: body.patronymicName,
          honorificTitle: body.honorificTitle,
          nameSuffix: body.nameSuffix
        },
      });
    } catch (err) {
      this.req.logger.error(err.message, err);
      throw err;
    }
  }
}
