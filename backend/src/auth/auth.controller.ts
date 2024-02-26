import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Ip,
  Post,
  Put,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  SignedUserResponseDto,
  PasswordDto,
  UpdateUserCredentialsDto,
  UserCredentialsDto,
} from './dto/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';

@ApiTags('Authentication')
@UseFilters(new HttpExceptionFilter())
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
        value: { username: 'akosi_user', password: 'Th1sIsNot@GoodPassword' },
      },
    },
  })
  @ApiCreatedResponse({
    description:
      'User is registered successfully. Response body will also contain new user information such as unique identifier.',
    type: SignedUserResponseDto,
  })
  @ApiConflictResponse({
    description: 'Username is already in use'
  })
  @HttpCode(201)
  async registerNewUser(
    @Body() body: UserCredentialsDto,
  ): Promise<SignedUserResponseDto> {
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
          password: 'Th1sIsNot@GoodPassword',
          newPassword: '1dfs34f$dsf21!Fer',
        },
      },
      basic2: {
        value: {
          password: '1dfs34f$dsf21!Fer',
          newPassword: 'Th1sIsNot@GoodPassword',
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
  async updatePassword(@Body() body: UpdateUserCredentialsDto) {
    return await this.auth.updatePassword(body);
  }

  @Delete('/')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Permanently deletes user data and granted permissions',
  })
  @ApiBearerAuth()
  @ApiBody({
    type: PasswordDto,
    examples: {
      basic: {
        value: { password: 'Th1sIsNot@GoodPassword' },
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
  async deleteUser(@Body() body: PasswordDto) {
    return await this.auth.deleteUser(body);
  }

  @Post('/login')
  @ApiOperation({
    summary: 'Signs-in the user and retrieve authentication session tokens',
  })
  @ApiBody({
    type: UserCredentialsDto,
    examples: {
      basic: {
        value: { username: 'akosi_user', password: 'Th1sIsNot@GoodPassword' },
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Access tokens are generated and provided',
  })
  @ApiUnauthorizedResponse({
    description: 'Provided credentials are invalid',
  })
  async signInUser(@Body() body: UserCredentialsDto): Promise<SignedUserResponseDto> {
    return this.auth.signIn(body.username, body.password);
  }
}
