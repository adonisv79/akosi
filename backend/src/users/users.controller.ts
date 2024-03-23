import { Controller, Get, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
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
