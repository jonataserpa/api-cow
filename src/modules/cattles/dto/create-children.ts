import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, Length } from "class-validator";
import constants from "src/config/constants";

export class CreateChildrenDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  id: string;

  @ApiProperty({
    description: 'Children default',
    example: 'Children test',
  })
  @Length(constants.STRING_MIN, constants.STRING_MAX)
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    description: 'Data born',
    example: '2022-08-13T16:05:29.000Z',
  })
  @IsString()
  @IsOptional()
  dateborn: string;

  @ApiProperty({
    description: 'Name father default',
    example: 'Name father default company',
  })
  @Length(constants.STRING_MIN, constants.STRING_MAX)
  @IsString()
  @IsOptional()
  namefather: string;

  @ApiProperty({
    description: 'Property Cattle',
    example: 'Paulo',
  })
  @Length(constants.STRING_MIN, constants.STRING_MAX)
  @IsString()
  @IsOptional()
  proprietary: string;

  @ApiProperty({
    description: 'Children default observacion',
    example: 'observacion',
  })
  @IsString()
  @IsOptional()
  observacion: string;

  @IsOptional()
  cattlesId: number;
}
