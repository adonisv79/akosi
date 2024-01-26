import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaClientInitializationError } from '@prisma/client/runtime/library';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    try {
      await this.$connect();
    } catch (err) {
      // Log the error (you can customize this part based on your needs)
      console.error('Failed to connect to the database:', err.message);
      if (err instanceof PrismaClientInitializationError) {
        return false;
      }
      throw err;
    }
    return true;
  }
}
