import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  MinLength,
} from 'class-validator';

export class UsersHistoriesResponseDto {
  @ApiProperty({
    description: 'The unique user identifier (UUIDv4)',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsUUID()
  @MinLength(16)
  userId: string;

  @ApiProperty({
    description: 'The activity code',
    required: true,
    type: Number,
  })
  @IsNumber()
  activityId: number;

  @ApiProperty({
    description: 'The date the activity occured',
    required: true,
    type: Date,
  })
  @IsDateString()
  createdDate: Date;
}
