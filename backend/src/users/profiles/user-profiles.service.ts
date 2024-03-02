import {
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserProfileFieldsDto } from './user-profiles.dto';
import { PrismaService } from 'src/prisma.service';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class UserProfilesService {
  constructor(
    @Inject(REQUEST) private readonly req: Request,
    private prisma: PrismaService,
  ) {}

  private validateIsUserIdCurrentUser(userId: string) {
    if (!this.req.user) {
      this.req.logger.warn(
        `Unsigned user attempted to access user with id#${userId}'s profiles`,
      );
      throw new UnauthorizedException();
    } else if (this.req.user?.id !== userId) {
      this.req.logger.warn(
        `User with id#${this.req.user.id} attempted to access user with id#${userId}'s profiles`,
      );
      throw new ForbiddenException();
    }
  }

  async getUserProfiles(
    userId: string,
    options?: { isPrimary?: boolean; skipUserMatchValidation?: boolean },
  ) {
    this.req.logger.log(`Retrieving profiles of userid:${userId}`);
    if (!options?.skipUserMatchValidation) this.validateIsUserIdCurrentUser(userId);
    return await this.prisma.userProfile.findMany({
      select: {
        id: true,
        name: true,
        isPrimary: true,
        givenName: true,
        middleName: true,
        surname: true,
        patronymicName: true,
        honorificTitle: true,
        nameSuffix: true,
        createdDate: true,
        lastUpdateDate: true,
        primaryEmailId: true,
        primaryEmail: {
          select: {
            emailId: true,
            verifiedDate: true,
            Email: {
              select: {
                address: true,
              }
            },
          }
        },
      },
      where: {
        userId,
        isPrimary: options?.isPrimary ?? undefined,
      },
      orderBy: [
        { isPrimary: 'desc' },
        { givenName: 'asc' },
        { surname: 'asc' },
      ],
    });
  }

  async addUserProfile(userId: string, body: UserProfileFieldsDto) {
    try {
      this.req.logger.log(`Adding profile for userid:${userId}`);
      this.validateIsUserIdCurrentUser(userId);
      const user = await this.prisma.user.findFirst({
        select: { id: true, profiles: true },
        where: { id: userId },
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
          name: body.name,
          isPrimary,
          userId: user.id,
          givenName: body.givenName,
          middleName: body.middleName,
          surname: body.surname,
          patronymicName: body.patronymicName,
          honorificTitle: body.honorificTitle,
          nameSuffix: body.nameSuffix,
        },
      });
    } catch (err) {
      this.req.logger.error(err.message, err);
      throw err;
    }
  }
}
