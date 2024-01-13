import { Injectable } from '@nestjs/common';
import { CreateNewUserDto } from './dtos/users.dto';
import { ConfigService } from '@nestjs/config';
import { Configuration } from 'src/config/configuration';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(
    private configService: ConfigService<Configuration>,
    private prisma: PrismaService,
  ) {
    const dbconfig = this.configService.get('database', { infer: true });
    console.log(JSON.stringify(dbconfig.url));
  }

  async createNewUser(body: CreateNewUserDto) {
    const result = await this.prisma.user.create({
      data: {
        username: body.username,
        passwordHash: body.password
      }
    });
    
    return { userId: result.id };
  }
}
