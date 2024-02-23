import { ApiProperty } from "@nestjs/swagger";
import { BiologicalSex } from "src/common/enums/biological_sex";
import { Languages } from "src/common/enums/languages";
import { IsNotEmpty, IsString, IsUUID, Length, MinLength, isUUID } from 'class-validator';

export class UsersParamsDto {
  @ApiProperty({
    description: "The unique user identifier",
    required: true,
    format: 'uuid_v4',
    type: String,
  })
  @IsUUID('4')
  userId: string;
}


// export class UpdateUserInfoDto extends UserNameDto {
//   @ApiProperty({
//     description: 'The date of birth based on the gregorian calendar',
//     type: Date,
//   })
//   dateOfBirth?: string;

//   @ApiProperty({
//     description: 'The biological sex a person is born with. Note that this is different from gender',
//     enum: BiologicalSex,
//     default: BiologicalSex.Male
//   })
//   biologicalSex?: BiologicalSex
// }
