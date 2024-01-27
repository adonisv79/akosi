import { ApiProperty, IntersectionType } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsStrongPassword, Length } from 'class-validator';

export class UsernameDto {
  @ApiProperty({
    description: 'The primary user\'s identifier. This has to be unique within the system and is only known to you for sign-in purposes.',
    required: true,
    type: String,
    minLength: 8,
    maxLength:255
  })
  @IsNotEmpty()
  @IsString()
  @Length(8, 255)
  username!: string;
}

export class PasswordDto {
  @ApiProperty({
    description: 'The initial password. User will use this to authenticate themselves within the system.',
    required: true,
    type: String,
    minLength: 12,
    maxLength: 12
  })
  @IsNotEmpty()
  @Length(12)
  password!: string;
}

export class NewPasswordDto {
  @ApiProperty({
    description: 'The new password that will replace the previous password.',
    required: true,
    type: String,
    minLength: 12,
    maxLength: 12
  })
  @IsNotEmpty()
  @Length(12)
  newPassword!: string;
}

export class UserCredentialsDto extends IntersectionType(
  UsernameDto,
  PasswordDto,
) {}

export class UpdateUserCredentialsDto extends IntersectionType(
  PasswordDto,
  NewPasswordDto,
) {}


export class CreateNewUserResponseDto {
  @ApiProperty({ description: 'The unique user identifier', type: String })
  @IsNotEmpty()
  @IsString()
  userId!: string
}
