import { Injectable } from '@nestjs/common';
import { ActionLogCodes } from 'src/common/enums/log_actions';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserActivitiesService {
  constructor(private prisma: PrismaService) {}

  async log(userId: string, activityId: ActionLogCodes) {
    await this.prisma.userActivityLog.create({
      data: {
        userId,
        activityId,
      },
    });
  }
}
