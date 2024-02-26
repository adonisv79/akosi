import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UsersHistoriesResponseDto } from './user-histories.dto';

@Injectable()
export class UserHistoriesService {
  constructor(private prisma: PrismaService) {}

  async getUserHistory(userId: string): Promise<UsersHistoriesResponseDto[]> {
    return await this.prisma.userActivityLog.findMany({
      select: { userId: true, activityId: true, createdDate: true },
      where: { userId },
      orderBy: { createdDate: 'desc' },
      take: 20,
    });
  }
}
