import { Body, Controller, Delete, HttpCode, Ip, Post, Put, Req, ValidationPipe } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateNewUserResponseDto, UpdateUserCredentialsDto, UserCredentialsDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@ApiTags('User Authentication')
@Controller('/auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('/')
  @ApiOperation({  summary: 'Registers a new user', description: 'Use this to create a new user account. Note that this is a secured endpoint that can only be accessed thru an official domain', })
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
  @ApiOperation({ summary: 'Updates user password credentials' })
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
  async updatePassword(
    @Req() req: Request,
    @Ip() ip,
    @Body(new ValidationPipe()) body: UpdateUserCredentialsDto,
  ) {
    return await this.auth.updatePassword(body);
  }

  @Post('/session')
  @ApiOperation({
    summary: 'Signs-in the user and retrieve authentication session tokens',
  })
  @ApiBody({
    type: UserCredentialsDto,
    examples: {
      basic: {
        value: { username: 'akosi_user', password: 'ThisIsNot@GoodPassword' },
      },
    },
  })
  @ApiOkResponse({
    description: 'The user credential is valid and session tokens are provided',
  })
  async loginUser(
    @Req() req: Request,
    @Ip() ip,
    @Body(new ValidationPipe()) body: UserCredentialsDto,
  ) {
    return await this.auth.authenticateUser(body);
  }

  @Put('/session')
  @ApiOperation({
    summary: 'Refreshes the current user session tokens',
  })
  @ApiOkResponse({
    description: 'The user session tokens have been renewed',
  })
  async refreshUserSession(
    @Req() req: Request,
    @Ip() ip,
  ) {
    return 'success';
  }

  @Delete('/session')
  @ApiOperation({
    summary: 'Signs-out the current user session and disables any active tokens',
  })
  @ApiOkResponse({
    description: 'The user has been signed out',
  })
  async logoutUser(
    @Req() req: Request,
    @Ip() ip,
  ) {
    return 'success';
  }
}
