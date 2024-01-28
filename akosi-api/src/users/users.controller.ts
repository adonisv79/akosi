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
} from '@nestjs/common';
import { AddLanguageDto, UpdateUserInfoDto } from './dto/users.dto';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Languages } from 'src/common/enums/languages';
import { UsersService } from './users.service';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';

@UseFilters(new HttpExceptionFilter())
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private users: UsersService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Retrieves user information' })
  @ApiOkResponse({ description: 'Resource retrieval success' })
  async getUserInfo(@Req() req: Request, @Ip() ip, @Param() params) {
    return {
      reqParams: params,
      ip,
      body: req.body,
      bodyUsed: req.bodyUsed,
      cache: req.cache,
      credentials: req.credentials,
      destination: req.destination,
      headers: req.headers,
      integrity: req.integrity,
      keepalive: req.keepalive,
      method: req.method,
      mode: req.mode,
      redirect: req.redirect,
      referrer: req.referrer,
      referrerPolicy: req.referrerPolicy,
      signal: req.signal,
      url: req.url,
    };
  }

  @Put('/')
  @ApiOperation({ summary: 'Updates user information' })
  @ApiBody({
    type: UpdateUserInfoDto,
    required: true,
    examples: {
      basicWestern: {
        description:
          'This is the global common standard for westernized countries',
        value: {
          givenName: 'John',
          middleName: 'Robert',
          surname: 'Doe',
          honorificTitle: 'Mr.',
          nameSuffix: 'Jr.',
          dateOfBirth: '1985-05-20',
          biologicalSex: 0,
        },
      },
      basicEastAsian: {
        description:
          'This is the global common standard for east-asian countries',
        value: {
          givenName: '隆',
          surname: '鈴木',
          dateOfBirth: '1980-05-20',
          gender: 0,
        },
      },
      basicSlavic: {
        description:
          'In Slavic tradition (i.e. Russian, Pollish), people uses a patronymic name with the given and surnames.',
        value: {
          givenName: 'Alexei',
          patronymicName: 'Ivanovich',
          surname: 'Popov',
          honorificTitle: 'Mr.',
          dateOfBirth: '1990-08-15',
          biologicalSex: 0,
        },
      },
      basicGreece: {
        description:
          'In Greece, just given with surnames are commonly used. In some rural traditions however, patronymic or matronymic names are still used.',
        value: {
          givenName: 'Nikos',
          patronymicName: 'Nikopoulos',
          surname: 'Papadopoulos',
          dateOfBirth: '1980-06-25',
          gender: 0,
        },
      },
      basicIceland: {
        description:
          'Iceland names use patronymic or matrynomic names instead of surnames. In some cases, matronimic names are used. surnames are sometimes used as well but less common.',
        value: {
          givenName: 'Jón',
          surname: 'Jónsson',
          dateOfBirth: '1988-03-10',
          gender: 0,
        },
      },
      basicTurkic: {
        description:
          'Some central-asian countries with Turkic influence (Kyrgyzstan, Tajikistan, and Uzbekistan) uses patronymic names',
        value: {
          givenName: 'Nur',
          surname: 'Toktogulov',
          patronymicName: 'Amanuly',
          dateOfBirth: '1985-12-10',
          gender: 0,
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'User must first sign in to have access to this functionality',
  })
  async updateUser(
    @Req() req: Request,
    @Ip() ip,
    @Body() body: UpdateUserInfoDto,
  ) {
    return {
      reqBody: body,
      ip,
      body: req.body,
      bodyUsed: req.bodyUsed,
      cache: req.cache,
      credentials: req.credentials,
      destination: req.destination,
      headers: req.headers,
      integrity: req.integrity,
      keepalive: req.keepalive,
      method: req.method,
      mode: req.mode,
      redirect: req.redirect,
      referrer: req.referrer,
      referrerPolicy: req.referrerPolicy,
      signal: req.signal,
      url: req.url,
    };
  }

  @Post('/lang')
  @ApiBody({
    type: AddLanguageDto,
    required: true,
    examples: {
      basic: {
        value: { lang: Languages.English, proficiency: 5 },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'User must first sign in to have access to this functionality',
  })
  async addLanguage(@Body() body: AddLanguageDto) {
    return { ...body };
  }
}
