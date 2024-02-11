import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
  PasswordDto,
  UpdateUserCredentialsDto,
  UserCredentialsDto,
} from './dto/auth.dto';
import { REQUEST } from '@nestjs/core';
import { UsernameInUseException } from 'src/common/exceptions/username-in-use.exception';
import { UserCredentialsInvalidException } from 'src/common/exceptions/user-credentials-invalid.exception';
import { UserActivitiesService } from 'src/user-activities/user-activities.service';
import { ActionLogCodes } from 'src/common/enums/log_actions';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Configuration } from 'src/config/configuration';

const LOGGER_CONTEXT = 'AuthService';

@Injectable()
export class AuthService {
  private readonly minRounds = 10;
  private readonly maxRounds = 13;
  private readonly jwtExpiresIn: string;

  constructor(
    @Inject(REQUEST) private readonly req: Request,
    private jwtService: JwtService,
    private userActivity: UserActivitiesService,
    private usersService: UsersService,
    private config: ConfigService<Configuration>,
  ) {
    this.jwtExpiresIn = this.config.get('api', { infer: true }).jwt.expiresIn
  }

  async signIn(username: string, password: string) {
    this.req.logger.warn(`authenticating user "${username}"`);
    try {
      const userId = await this.usersService.validateUserAndGetId(
        username,
        password,
      );
      if (!userId) throw new UserCredentialsInvalidException();

      const result = await this.usersService.findOne(username);
      const accessToken = await this.jwtService.signAsync(
        {
          sub: result.id,
          username: result.username,
          memberSince: result.createdDate,
        },
        { expiresIn: this.jwtExpiresIn },
      );

      this.userActivity.log(result.id, ActionLogCodes.userAuthSignedIn);
      this.req.logger.log(
        `User ${result.id} authenticated successfully`,
        LOGGER_CONTEXT,
      );
      return { accessToken };
    } catch (err) {
      // this.errors.handlePrismaConnectivityErrors(err, LOGGER_CONTEXT);
      // this.errors.handleGeneralError(err, LOGGER_CONTEXT);
      throw err;
    }
  }

  private async encryptPassword(password: string): Promise<string> {
    const rounds =
      Math.floor(Math.random() * (this.maxRounds - this.minRounds + 1)) +
      this.minRounds;
    return await bcrypt.hash(password, rounds);
  }

  async createNewUser(body: UserCredentialsDto) {
    this.req.logger.log(`Creating new user "${body.username}"`);
    try {
      if (await this.usersService.usernameExists(body.username))
        throw new UsernameInUseException();
      const hash = await this.encryptPassword(body.password);

      const result = await this.usersService.create(body.username, hash);
      this.userActivity.log(result.id, ActionLogCodes.userAuthRegistered);

      const accessToken = await this.jwtService.signAsync(
        {
          sub: result.id,
          username: result.username,
          memberSince: result.createdDate,
        },
        { expiresIn: this.jwtExpiresIn },
      );

      this.req.logger.log(
        `User ${result.id} created successfully`,
        LOGGER_CONTEXT,
      );
      return { accessToken };
    } catch (err: any) {
      this.req.logger.error(err.message, err.stack, LOGGER_CONTEXT);
      throw err;
    }
  }

  async deleteUser(body: PasswordDto) {
    this.req.logger.warn(`deleting user "${this.req.user.username}"`);
    const userId = await this.usersService.validateUserAndGetId(
      this.req.user.username,
      body.password,
    );
    if (!userId) throw new UserCredentialsInvalidException();

    const result = await this.usersService.delete(this.req.user.username);
    // this.userActivity.log(result.id, ActionLogCodes.userAuthDeleted);

    this.req.logger.log(
      `User ${result.id} deleted successfully`,
      LOGGER_CONTEXT,
    );
    return;
  }

  async updatePassword(body: UpdateUserCredentialsDto) {
    this.req.logger.warn(
      `updating user's passwrod "${this.req.user.username}"`,
    );
    const userId = await this.usersService.validateUserAndGetId(
      this.req.user.username,
      body.password,
    );
    if (!userId) throw new UserCredentialsInvalidException();
    const newHash = await this.encryptPassword(body.newPassword);
    await this.usersService.updatePasswordHash(this.req.user.username, newHash);
    this.userActivity.log(userId, ActionLogCodes.userAuthChangedPassword);
    this.req.logger.log(
      `User ${userId}'s password updated successfully`,
      LOGGER_CONTEXT,
    );
    return 'Password updated successfully';
  }
}
