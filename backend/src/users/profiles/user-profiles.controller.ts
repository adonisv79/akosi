import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserProfileFieldsDto, UserProfileDto } from './user-profiles.dto';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersParamsDto } from '../dto/users.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { UserProfilesService } from './user-profiles.service';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('User Profiles')
@Controller('/users/:userId/profiles')
export class UserProfilesController {
  constructor(private profiles: UserProfilesService) {}

  @ApiOperation({
    summary:
      "Fetches the profile for the user",
      description: "This allows a user to fetch all of their profiles. Default sorted by primary profile flag, given name then surname."
  })
  @Get('/')
  @ApiOkResponse({ description: 'Successfully retrieverd the user profiles', type: [UserProfileDto]})
  async GetUserProfiles(
    @Param() param: UsersParamsDto): Promise<UserProfileDto[]> {
      return await this.profiles.getUserProfiles(param);
  }

  @ApiOperation({
    summary:
      "Creates a new profile for the user",
      description: "This allows a user to add a new profile to their account. If this is the first profile they made, it becomes the user's primary profile"
  })
  @ApiBody({
    type: UserProfileFieldsDto,
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
  @ApiOkResponse({ description: 'Successfully created the user profiles', type: UserProfileDto})
  @Post('/')
  async createUserProfile(
    @Param() param: UsersParamsDto,
    @Body() body: UserProfileFieldsDto,
  ): Promise<UserProfileDto> {
    return await this.profiles.addUserProfile(param, body);
  }
}
