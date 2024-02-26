import {
  Body,
  Controller,
  Get,
  Ip,
  Param,
  Post,
  Put,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Languages } from 'src/common/enums/languages';
import { UsersService } from './users.service';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { Request } from 'express';
import { AuthGuard } from 'src/common/guards/auth.guard';

@UseFilters(new HttpExceptionFilter())
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private users: UsersService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Retrieves user information' })
  @Get('/self')
  async getCurrentUserInfo(@Req() req: Request) {
    return await this.users.findOneById(req.user.id);
  }
}
