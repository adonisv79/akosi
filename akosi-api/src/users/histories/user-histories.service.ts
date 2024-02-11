import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserHistoriesService {
  constructor(private prisma: PrismaService) {}

  async getUserHistory(userId: string) {
    return await this.prisma.userActivityLog.findMany({
      where: { userId },
      orderBy: { createdDate: 'desc' },
      take: 20,
    });
  }
}
