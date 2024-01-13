import { ApiProperty } from "@nestjs/swagger";
import { BiologicalSex } from "src/enums/biological_sex";
import { Languages } from "src/enums/languages";

export class CreateNewUserDto {
  @ApiProperty({
    description: 'The primary user\'s identifier. This has to be unique within the system and is only known to you for sign-in purposes.',
    required: true,
    type: String,
    minimum: 1
  })
  username!: string;

  @ApiProperty({
    description: 'The initial password. User will use this to authenticate themselves within the system.',
    required: true,
    type: String,
    minimum: 12
  })
  password!: string;
}

export class CreateNewUserResponseDto {
  @ApiProperty({ description: 'The unique user identifier', type: String })
  userId!: string
}

class UserNameDto {
  @ApiProperty({
    description: 'The given, personal or primary name. This includes second name if you have one.',
    required: true,
    type: String,
    minimum: 1
  })
  givenName!: string;

  @ApiProperty({
    description: 'The middle name (if applicable) is a part of a name that may derive from your mother\'s maiden surname or both parents depending on your culture.',
    type: String,
    minimum: 1
  })
  middleName?: string;

  @ApiProperty({
    description: 'The surname (a.k.a. lastname, family name, patrymonic or matrynomic name) is the part of the name that is passed down to indicate ancestry and is what is used by most cultures',
    type: String,
    minimum: 1
  })
  surname?: string;

  @ApiProperty({
    description: '(In cases patronymic names are not part of ones surname) The patronymic name is part of the name to indicate relation to the father which is applied in some culture (i.e. Russia, Greece, Armenia, and Georgia). For Iceland, use surname for patronymic or matronymic fields',
    type: String,
    minimum: 1
  })
  patronymicName?: string;
  
  @ApiProperty({
    description: 'Honorific titles are part of names to formaly convey status',
    type: String,
    minimum: 1
  })
  honorificTitle?: string;

  @ApiProperty({
    description: 'Name suffixes, like honorific titles, are elements added to the end of a person\'s name to convey additional information or respect. Suffixes can serve various purposes and may indicate factors such as academic degrees, professional qualifications, or hereditary titles',
    type: String,
    minimum: 1
  })
  nameSuffix?: string;
}

export class UpdateUserInfoDto extends UserNameDto {
  @ApiProperty({
    description: 'The date of birth based on the gregorian calendar',
    type: Date,
  })
  dateOfBirth?: string;

  @ApiProperty({
    description: 'The biological sex a person is born with. Note that this is different from gender',
    enum: BiologicalSex,
    default: BiologicalSex.Male
  })
  biologicalSex?: BiologicalSex
}

export class AddLanguageDto {
  @ApiProperty({
    description: 'The language identifier',
    enum: Languages,
    required: true,
  })
  lang!: Languages;

  @ApiProperty({
    description: 'The proficiency level. 1-unfamiliar, 2-basic, 3-conversational, 4-proficient, 5-fluent ',
    enum: Number,
    minimum: 1,
    maximum: 5,
    required: true,
  })
  proficiency!: Number;
}