import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration } from 'src/config/configuration';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { UpdateUserCredentialsDto, UserCredentialsDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  private minRounds = 10;
  private maxRounds = 13;

  constructor( private prisma: PrismaService ) {}

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
    if (await this.usernameExists(body.username))
      throw new BadRequestException('Username already used');
    const hash = await this.encryptPassword(body.password);

    const result = await this.prisma.user.create({
      data: {
        username: body.username,
        passwordHash: hash,
      },
    });

    return { userId: result.id };
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
      console.log(err);
      return false;
    }
  }

  async authenticateUser(body: UserCredentialsDto) {
    if ((await this.isCredentialsValid(body)) === false)
      throw new NotFoundException('Username or password invalid.');
    // perform token creation and attach to headers
    return 'User authenticated successfully';
  }

  async updatePassword(body: UpdateUserCredentialsDto) {
    if ((await this.isCredentialsValid(body)) === false)
      throw new NotFoundException('Username or password invalid.');
    const newHash = await this.encryptPassword(body.newPassword);
    await this.prisma.user.update({
      data: { passwordHash: newHash },
      where: { username: body.username },
    });
    return 'Password updated successfully';
  }
}
