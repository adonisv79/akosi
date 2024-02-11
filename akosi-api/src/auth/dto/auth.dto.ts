import { ApiProperty, IntersectionType } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsString, IsStrongPassword, Length, Matches, MaxLength, MinLength } from 'class-validator';
const MIN_LENGTH = 8;
const MAX_LENGTH = 255;
const PASSWORD_PATTERN_RULE = `^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*\\-_=+;:'",.<>?\\{\\}\\(\\)\\|\\/\\\\]).{${MIN_LENGTH},${MAX_LENGTH}}$`;

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
    minLength: 8,
    maxLength: 255
  })
  @IsNotEmpty()
  @MinLength(MIN_LENGTH)
  @MaxLength(MAX_LENGTH)
  @Matches(new RegExp(PASSWORD_PATTERN_RULE), { message: 'Password is too weak' })
  password!: string;
}

export class NewPasswordDto {
  @ApiProperty({
    description: 'The new password that will replace the previous password.',
    required: true,
    type: String,
    minLength: 8,
    maxLength: 255
  })
  @IsNotEmpty()
  @MinLength(MIN_LENGTH)
  @MaxLength(MAX_LENGTH)
  @Matches(new RegExp(PASSWORD_PATTERN_RULE), { message: 'Password is too weak' })
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


export class SignedUserResponseDto {
  @ApiProperty({ description: 'The JWT session token to use', type: String })
  @IsNotEmpty()
  @IsString()
  accessToken: string
}
