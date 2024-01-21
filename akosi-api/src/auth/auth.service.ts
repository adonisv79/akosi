import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { UpdateUserCredentialsDto, UserCredentialsDto } from './dto/auth.dto';
import { REQUEST } from '@nestjs/core';
import { CustomRequest } from 'src/common/middleware/logger.middleware';

const LOGGER_CONTEXT = 'AuthService';
const INVALID_CREDENTIALS_MSG = 'Username or password invalid.';

@Injectable()
export class AuthService {
  private minRounds = 10;
  private maxRounds = 13;

  constructor(
    @Inject(REQUEST) private readonly req: CustomRequest,
    private prisma: PrismaService,
  ) {}

  async usernameExists(username: string) {
    if (!username) throw new BadRequestException('Username invalid');
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

  async createNewUser(body: UserCredentialsDto) {
    this.req.logger.log(`Creating new user "${body.username}"`);
    try {
      if (await this.usernameExists(body.username))
        throw new BadRequestException('Username already used');
      const hash = await this.encryptPassword(body.password);

      const result = await this.prisma.user.create({
        data: {
          username: body.username,
          passwordHash: hash,
        },
      });

      this.req.logger.log(`User ${body.username} created successfully`, LOGGER_CONTEXT);
      return { userId: result.id };
    } catch (err: any) {
      this.req.logger.error(err.message, err.stack, LOGGER_CONTEXT);
      throw err;
    }
  }

  async deleteUser(body: UserCredentialsDto) {
    this.req.logger.warn(`deleting user "${body.username}"`);
    try {
      if (!(await this.usernameExists(body.username)))
        throw new NotFoundException();
      const hash = await this.encryptPassword(body.password);

      if (!(await this.isCredentialsValid(body)))
        throw new BadRequestException(INVALID_CREDENTIALS_MSG);

      const result = await this.prisma.user.delete({
        where: {
          username: body.username,
        },
      });

      this.req.logger.log(`User ${body.username} deleted successfully`, LOGGER_CONTEXT);
      return;
    } catch (err) {
      this.req.logger.error(err.message, err.stack, LOGGER_CONTEXT);
      throw err;
    }
  }

  private async isCredentialsValid(body: UserCredentialsDto): Promise<boolean> {
    try {
      const result = await this.prisma.user.findFirst({
        select: { passwordHash: true },
        where: { username: body.username },
      });
      if (!result) return false;
      const isMatch = await bcrypt.compare(body.password, result.passwordHash);
      return isMatch;
    } catch (err) {
      this.req.logger.error(err.message, err.stack, LOGGER_CONTEXT);
      return false; // just fail the sign-in
    }
  }

  async authenticateUser(body: UserCredentialsDto) {
    this.req.logger.warn(`authenticating user "${body.username}"`);
    try {
      if ((await this.isCredentialsValid(body)) === false)
        throw new NotFoundException(INVALID_CREDENTIALS_MSG);
      // perform token creation and attach to headers
      this.req.logger.log(`User ${body.username} authenticated successfully`, LOGGER_CONTEXT);
      return 'User authenticated successfully';
    } catch (err) {
      this.req.logger.error(err.message, err.stack, LOGGER_CONTEXT);
      throw err;
    }
  }

  async updatePassword(body: UpdateUserCredentialsDto) {
    this.req.logger.warn(`updating user's passwrod "${body.username}"`);
    try {
      if ((await this.isCredentialsValid(body)) === false)
        throw new BadRequestException(INVALID_CREDENTIALS_MSG);
      const newHash = await this.encryptPassword(body.newPassword);
      await this.prisma.user.update({
        data: { passwordHash: newHash },
        where: { username: body.username },
      });
      this.req.logger.log(`User ${body.username}'s password updated successfully`, LOGGER_CONTEXT);
      return 'Password updated successfully';
    } catch (err) {
      this.req.logger.error(err.message, err.stack, LOGGER_CONTEXT);
      throw err;
    }
  }
}
