import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { UpdateUserCredentialsDto, UserCredentialsDto } from './dto/auth.dto';
import { REQUEST } from '@nestjs/core';
import { CustomRequest } from 'src/common/middleware/logger.middleware';
import { UsernameInUseException } from 'src/common/exceptions/username-in-use.exception';
import { UserCredentialsInvalidException } from 'src/common/exceptions/user-credentials-invalid.exception';
import { UserActivitiesService } from 'src/user-activities/user-activities.service';
import { ActionLogCodes } from 'src/common/enums/log_actions';
import { ErrorHandlerService } from 'src/errors/error-handler.service';

const LOGGER_CONTEXT = 'AuthService';

@Injectable()
export class AuthService {
  private minRounds = 10;
  private maxRounds = 13;

  constructor(
    @Inject(REQUEST) private readonly req: CustomRequest,
    private errors: ErrorHandlerService,
    private prisma: PrismaService,
    private userActivity: UserActivitiesService,
  ) {}

  async usernameExists(username: string) {
    const result = await this.prisma.user.findFirst({
      select: { username: true },
      where: { username },
    });
    return !!result;
  }

  private async encryptPassword(password: string): Promise<string> {
    const rounds =
      Math.floor(Math.random() * (this.maxRounds - this.minRounds + 1)) +
      this.minRounds;
    return await bcrypt.hash(password, rounds);
  }

  private async validateAndGetUserId(
    body: UserCredentialsDto,
  ): Promise<string | null> {
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

  async createNewUser(body: UserCredentialsDto) {
    this.req.logger.log(`Creating new user "${body.username}"`);
    try {
      if (await this.usernameExists(body.username))
        throw new UsernameInUseException(body.username);
      const hash = await this.encryptPassword(body.password);

      const result = await this.prisma.user.create({
        data: {
          username: body.username,
          passwordHash: hash,
        },
      });
      this.userActivity.log(result.id, ActionLogCodes.userAuthRegistered);

      this.req.logger.log(
        `User ${result.id} created successfully`,
        LOGGER_CONTEXT,
      );
      return { userId: result.id };
    } catch (err: any) {
      this.req.logger.error(err.message, err.stack, LOGGER_CONTEXT);
      throw err;
    }
  }

  async deleteUser(body: UserCredentialsDto) {
    this.req.logger.warn(`deleting user "${body.username}"`);
    try {
      const userId = await this.validateAndGetUserId(body);
      if (!userId) throw new UserCredentialsInvalidException();

      const result = await this.prisma.user.delete({
        where: {
          username: body.username,
        },
      });
      // this.userActivity.log(result.id, ActionLogCodes.userAuthDeleted);

      await this.req.logger.log(
        `User ${result.id} deleted successfully`,
        LOGGER_CONTEXT,
      );
      return;
    } catch (err) {
      this.errors.handlePrismaConnectivityErrors(err, LOGGER_CONTEXT);
      this.errors.handleGeneralError(err, LOGGER_CONTEXT);
      throw err;
    }
  }

  async authenticateUser(body: UserCredentialsDto) {
    this.req.logger.warn(`authenticating user "${body.username}"`);
    try {
      const userId = await this.validateAndGetUserId(body);
      if (!userId) throw new UserCredentialsInvalidException();
      // perform token creation and attach to headers

      this.userActivity.log(userId, ActionLogCodes.userAuthSignedIn);
      this.req.logger.log(
        `User ${userId} authenticated successfully`,
        LOGGER_CONTEXT,
      );
      return 'User authenticated successfully';
    } catch (err) {
      this.errors.handlePrismaConnectivityErrors(err, LOGGER_CONTEXT);
      this.errors.handleGeneralError(err, LOGGER_CONTEXT);
      throw err;
    }
  }

  async updatePassword(body: UpdateUserCredentialsDto) {
    this.req.logger.warn(`updating user's passwrod "${body.username}"`);
    try {
      const userId = await this.validateAndGetUserId(body);
      if (!userId) throw new UserCredentialsInvalidException();
      const newHash = await this.encryptPassword(body.newPassword);
      await this.prisma.user.update({
        data: { passwordHash: newHash },
        where: { username: body.username },
      });
      this.userActivity.log(userId, ActionLogCodes.userAuthChangedPassword);
      this.req.logger.log(
        `User ${userId}'s password updated successfully`,
        LOGGER_CONTEXT,
      );
      return 'Password updated successfully';
    } catch (err) {
      this.errors.handlePrismaConnectivityErrors(err, LOGGER_CONTEXT);
      this.errors.handleGeneralError(err, LOGGER_CONTEXT);
      throw err;
    }
  }
}
