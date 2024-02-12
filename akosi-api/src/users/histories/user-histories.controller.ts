import {
  Controller,
  Get,
  Param,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { UsersParamsDto } from '../dto/users.dto';
import { Request } from 'express';
import { UserHistoriesService } from './user-histories.service';
import { UsersHistoriesResponseDto } from './user-histories.dto';

@UseFilters(new HttpExceptionFilter())
@UseGuards(AuthGuard)
@ApiTags('User Histories')
@ApiBearerAuth()
@Controller('users/:userId/histories')
export class UserHistoriesController {
  constructor(private history: UserHistoriesService) {}

  @ApiOperation({ summary: 'Rertrieves user past activity histories' })
  @ApiOkResponse({
    description: 'Successfully retrieved the user histories',
    type: [UsersHistoriesResponseDto],
  })
  @Get('/')
  async getUserHistories(
    @Param() params: UsersParamsDto,
    @Req() req: Request,
  ): Promise<UsersHistoriesResponseDto[]> {
    // todo: make this secured where you can only view yours and accounts that granted you history access
    return await this.history.getUserHistory(params.userId);
  }
}
