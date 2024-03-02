import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

export class UserProfileFieldsDto {
  @ApiProperty({
    description: 'The user profile name.',
    required: true,
    type: String,
    maxLength: 30,
  })
  @IsNotEmpty()
  @MaxLength(30)
  @IsString()
  name!: string;

  @ApiProperty({
    description: 'The given, personal or primary name. This includes second name if you have one.',
    required: true,
    type: String,
    minimum: 1
  })
  @IsNotEmpty()
  @MaxLength(255)
  @IsString()
  givenName!: string;

  @ApiProperty({
    description: 'The middle name (if applicable) is a part of a name that may derive from your mother\'s maiden surname or both parents depending on your culture.',
    type: String,
    required: false,
    minimum: 1
  })
  @IsOptional()
  @MaxLength(255)
  @IsString()
  middleName?: string;

  @ApiProperty({
    description: 'The surname (a.k.a. lastname, family name, patrymonic or matrynomic name) is the part of the name that is passed down to indicate ancestry and is what is used by most cultures',
    type: String,
    required: false,
    minimum: 1
  })
  @IsOptional()
  @MaxLength(255)
  @IsString()
  surname?: string;

  @ApiProperty({
    description: '(In cases patronymic names are not part of ones surname) The patronymic name is part of the name to indicate relation to the father which is applied in some culture (i.e. Russia, Greece, Armenia, and Georgia). For Iceland, use surname for patronymic or matronymic fields',
    type: String,
    required: false,
    minimum: 1
  })
  @IsOptional()
  @MaxLength(255)
  @IsString()
  patronymicName?: string;
  
  @ApiProperty({
    description: 'Honorific titles are part of names to formaly convey status',
    type: String,
    required: false,
    minimum: 1
  })
  @IsOptional()
  @MaxLength(255)
  @IsString()
  honorificTitle?: string;

  @ApiProperty({
    description: 'Name suffixes, like honorific titles, are elements added to the end of a person\'s name to convey additional information or respect. Suffixes can serve various purposes and may indicate factors such as academic degrees, professional qualifications, or hereditary titles',
    type: String,
    required: false,
    minimum: 1
  })
  @IsOptional()
  @MaxLength(255)
  @IsString()
  nameSuffix?: string;
}

export class UserProfileDto extends UserProfileFieldsDto {
  @ApiProperty({
    description: 'Unique record identifier for the profile',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  id!: string;
}

export class GetUserProfilesResponseDto extends UserProfileDto {
  @ApiProperty({
    description: 'Indicates if this is the user\'s primary profile',
    type: Boolean,
    required: true,
    default: false,
  })
  @IsBoolean()
  isPrimary!: boolean;
}