import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async validateUserAndGetId(username: string, password: string) {
    const result = await this.prisma.user.findFirst({
      select: { id: true, passwordHash: true },
      where: { username },
    });
    if (!result) return null;
    const isMatch = await bcrypt.compare(password, result.passwordHash);
    return isMatch ? result.id : null;
  }

  async findOne(username: string) {
    return await this.prisma.user.findFirst({
      select: {
        id: true,
        username: true,
        createdDate: true,
        lastUpdateDate: true,
      },
      where: { username },
    });
  }

  async findOneById(userId: string) {
    return await this.prisma.user.findFirst({
      select: {
        id: true,
        username: true,
        createdDate: true,
        lastUpdateDate: true,
      },
      where: { id: userId },
    });
  }

  async usernameExists(username: string) {
    return (
      (await this.prisma.user.count({
        where: { username },
      })) !== 0
    );
  }

  async create(username: string, passwordHash: string) {
    return await this.prisma.user.create({
      data: { username, passwordHash },
    });
  }

  async delete(username: string) {
    return await this.prisma.user.delete({
      where: { username },
    });
  }

  async updatePasswordHash(username: string, passwordHash: string) {
    await this.prisma.user.update({
      data: { passwordHash },
      where: { username },
    });
  }
}
