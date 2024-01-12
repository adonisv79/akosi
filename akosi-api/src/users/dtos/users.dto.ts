import { ApiProperty } from "@nestjs/swagger";

class UserNameDto {
  givenName!: string;
  middleName?: string;
  familyName?: string;
  patronymicName?: string;
  matronymicName?: string;
  honorificTitle?: string;
  nameSuffix?: string;
}

export class CreateNewUserDto extends UserNameDto {
  @ApiProperty({
    description: 'Your primary user identifier. This has to be unique within the system and is only known to you for sign-in purposes.',
    minimum: 1
  })
  username?: string;

  @ApiProperty({
    description: 'Your initial password. Use this to authenticate yourself within the system.',
    minimum: 12
  })
  password: string;
}