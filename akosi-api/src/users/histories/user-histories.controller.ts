import {
  Controller,
  Get,
  Param,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { UsersParamsDto } from '../dto/users.dto';
import { Request } from 'express';
import { UserHistoriesService } from './user-histories.service';

@UseFilters(new HttpExceptionFilter())
@UseGuards(AuthGuard)
@ApiTags('User Histories')
@ApiBearerAuth()
@Controller('users/:userId/histories')
export class UserHistoriesController {
  constructor(private history: UserHistoriesService) {}

  @ApiOperation({ summary: 'Rertrieves user past activity histories' })
  @Get('/')
  async getUserHistories(@Param() params: UsersParamsDto, @Req() req: Request) {
    // todo: make this secured where you can only view yours and accounts that granted you history access
    return await this.history.getUserHistory(params.userId)
  }
}
