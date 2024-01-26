import { Body, Controller, Delete, HttpCode, Ip, Post, Put, Req, ValidationPipe } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateNewUserResponseDto, UpdateUserCredentialsDto, UserCredentialsDto } from '../dto/auth.dto';
import { AuthService } from '../auth.service';

@ApiTags('User Authentication')
@Controller('/auth')
export class AuthSessionController {
  constructor(private auth: AuthService) {}

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
  @ApiUnauthorizedResponse({
    description: 'Provided credentials are invalid',
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
