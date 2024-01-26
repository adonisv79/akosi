import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Ip,
  Post,
  Put,
  Req,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserCredentialsDto } from '../dto/auth.dto';
import { AuthSessionService } from './auth-session.service';
import { AuthGuard } from 'src/common/guards/auth.guard';

@ApiTags('User Authentication')
@Controller('/auth/session')
export class AuthSessionController {
  constructor(private authSession: AuthSessionService) {}

  @Get('/')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('/')
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
  async signIn(
    @Req() req: Request,
    @Ip() ip,
    @Body(new ValidationPipe()) body: UserCredentialsDto,
  ) {
    return await this.authSession.signIn(body);
  }

  @Put('/')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Refreshes the current user session tokens',
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'The user session tokens have been renewed',
  })
  async refreshUserSession(@Req() req: Request, @Ip() ip) {
    return 'success';
  }

  @Delete('/')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary:
      'Signs-out the current user session and disables any active tokens',
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'The user has been signed out',
  })
  async logoutUser(@Req() req: Request, @Ip() ip) {
    return 'success';
  }
}
