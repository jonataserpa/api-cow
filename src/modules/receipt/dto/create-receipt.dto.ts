import { ApiProperty } from "@nestjs/swagger";
import { PaymentStatus } from "@prisma/client";
import { IsInt, IsOptional, IsString, Length } from "class-validator";
import constants from "src/config/constants";

export class CreateReceiptDto {
  @ApiProperty({
    description: 'Receipt default',
    example: 'Receipt test',
  })
  @Length(constants.STRING_MIN, constants.STRING_MAX)
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Receipt id companyId',
    example: '1',
  })
  @IsOptional()
  @IsInt()
  companyId: number;

  @ApiProperty({
    description: 'Receipt value',
    example: '99.55',
  })
  @IsOptional()
  @IsString()
  value: string;

  @ApiProperty({
    description: 'Receipt status',
    example: 'RECEIVED',
  })
  @IsString()
  @IsOptional()
  status: PaymentStatus;

  @ApiProperty({
    description: 'Receipt default observacion',
    example: 'observacion',
  })
  @IsString()
  @IsOptional()
  observacion: string;
}
