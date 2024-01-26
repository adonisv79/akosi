import { Inject, Injectable } from '@nestjs/common';
import { UserCredentialsDto } from '../dto/auth.dto';
import { REQUEST } from '@nestjs/core';
import { UserCredentialsInvalidException } from 'src/common/exceptions/user-credentials-invalid.exception';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ErrorHandlerService } from 'src/errors/error-handler.service';
import { UserActivitiesService } from 'src/user-activities/user-activities.service';
import { ActionLogCodes } from 'src/common/enums/log_actions';
import { PrismaService } from 'src/prisma.service';

const LOGGER_CONTEXT = 'AuthSessionService';

@Injectable()
export class AuthSessionService {
  constructor(
    @Inject(REQUEST) private readonly req: Request,
    private errors: ErrorHandlerService,
    private jwtService: JwtService,
    private prisma: PrismaService,
    private userActivity: UserActivitiesService,
  ) {}

  async validateAndGetUserId(body: UserCredentialsDto): Promise<string | null> {
    try {
      const result = await this.prisma.user.findFirst({
        select: { id: true, passwordHash: true },
        where: { username: body.username },
      });
      if (!result) return null;
      const isMatch = await bcrypt.compare(body.password, result.passwordHash);
      return isMatch ? result.id : null;
    } catch (err) {
      this.errors.handlePrismaConnectivityErrors(err, LOGGER_CONTEXT);
      this.errors.handleGeneralError(err, LOGGER_CONTEXT);
      return null; // just fail the sign-in
    }
  }

  async signIn(body: UserCredentialsDto) {
    this.req.logger.warn(`authenticating user "${body.username}"`);
    try {
      const userId = await this.validateAndGetUserId(body);
      if (!userId) throw new UserCredentialsInvalidException();
      // perform token creation and attach to headers
      const access_token = await this.jwtService.signAsync({
        sub: userId,
        username: body.username,
      });
      this.userActivity.log(userId, ActionLogCodes.userAuthSignedIn);

      this.req.logger.log(
        `User ${userId} authenticated successfully`,
        LOGGER_CONTEXT,
      );
      return { access_token };
    } catch (err) {
      this.errors.handlePrismaConnectivityErrors(err, LOGGER_CONTEXT);
      this.errors.handleGeneralError(err, LOGGER_CONTEXT);
      throw err;
    }
  }
}
