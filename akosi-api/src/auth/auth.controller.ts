import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Ip,
  Post,
  Put,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  CreateNewUserResponseDto,
  UpdateUserCredentialsDto,
  UserCredentialsDto,
} from './dto/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/common/guards/auth.guard';

@ApiTags('User Authentication')
@Controller('/auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('/')
  @ApiOperation({
    summary: 'Registers a new user',
    description:
      'Use this to create a new user account. Note that this is a secured endpoint that can only be accessed thru an official domain',
  })
  @ApiBody({
    type: UserCredentialsDto,
    examples: {
      basic: {
        value: { username: 'akosi_user', password: 'ThisIsNot@GoodPassword' },
      },
    },
  })
  @ApiCreatedResponse({
    description:
      'User is registered successfully. Response body will also contain new user information such as unique identifier.',
    type: CreateNewUserResponseDto,
  })
  @HttpCode(201)
  async registerNewUser(
    @Body(new ValidationPipe()) body: UserCredentialsDto,
  ): Promise<CreateNewUserResponseDto> {
    return this.auth.createNewUser(body);
  }

  @Put('/')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Updates user password credentials' })
  @ApiBearerAuth()
  @ApiBody({
    type: UpdateUserCredentialsDto,
    examples: {
      basic1: {
        value: {
          username: 'akosi_user',
          password: 'ThisIsNot@GoodPassword',
          newPassword: '1dfs34f$dsf21!Fer',
        },
      },
      basic2: {
        value: {
          username: 'akosi_user',
          password: '1dfs34f$dsf21!Fer',
          newPassword: 'ThisIsNot@GoodPassword',
        },
      },
    },
  })
  @ApiOkResponse({
    description: 'The user credential was updated successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Provided credentials are invalid',
  })
  async updatePassword(
    @Req() req: Request,
    @Ip() ip,
    @Body(new ValidationPipe()) body: UpdateUserCredentialsDto,
  ) {
    return await this.auth.updatePassword(body);
  }

  @Delete('/')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Permanently deletes user data and granted permissions',
  })
  @ApiBearerAuth()
  @ApiBody({
    type: UserCredentialsDto,
    examples: {
      basic: {
        value: { username: 'akosi_user', password: 'ThisIsNot@GoodPassword' },
      },
    },
  })
  @ApiNoContentResponse({
    description: 'The user data and grants were deleted successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Provided credentials are invalid',
  })
  @HttpCode(204)
  async deleteUser(
    @Req() req: Request,
    @Ip() ip,
    @Body(new ValidationPipe()) body: UserCredentialsDto,
  ) {
    return await this.auth.deleteUser(body);
  }
}
