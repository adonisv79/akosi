import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsStrongPassword, Length } from 'class-validator';

export class UserCredentialsDto {
  @ApiProperty({
    description: 'The primary user\'s identifier. This has to be unique within the system and is only known to you for sign-in purposes.',
    required: true,
    type: String,
    minimum: 1
  })
  @IsNotEmpty()
  @IsString()
  @Length(8, 255)
  username!: string;

  @ApiProperty({
    description: 'The initial password. User will use this to authenticate themselves within the system.',
    required: true,
    type: String,
    minimum: 12
  })
  @IsNotEmpty()
  @Length(8, 255)
  password!: string;
}

export class UpdateUserCredentialsDto extends UserCredentialsDto {
  @ApiProperty({
    description: 'The primary user\'s identifier. This has to be unique within the system and is only known to you for sign-in purposes.',
    required: true,
    type: String,
    minimum: 12
  })
  @IsNotEmpty()
  newPassword!: string;
}

export class CreateNewUserResponseDto {
  @ApiProperty({ description: 'The unique user identifier', type: String })
  @IsNotEmpty()
  @IsString()
  userId!: string
}
