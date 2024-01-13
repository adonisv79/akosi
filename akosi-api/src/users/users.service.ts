import { Injectable } from "@nestjs/common";
import { CreateNewUserDto } from "./dtos/users.dto";
import { ConfigService } from "@nestjs/config";
import { Configuration } from "src/config/configuration";

@Injectable()
export class UsersService {
  constructor(private configService: ConfigService<Configuration>) {
    const dbconfig = this.configService.get('database', { infer: true })
    console.log(JSON.stringify(dbconfig.url))
  }

  async createNewUser(body: CreateNewUserDto) {
    return { userId: body.username + '1234' };
  }
}