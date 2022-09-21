import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus } from '@prisma/client';
import { IsInt, IsOptional, IsString, Length } from 'class-validator';
import constants from 'src/config/constants';

export class CreatePaymentDto {
  @ApiProperty({
    description: 'Payment default',
    example: 'Payment test',
  })
  @Length(constants.STRING_MIN, constants.STRING_MAX)
  @IsString()
  description: string;
  
  @ApiProperty({
    description: 'Payment id companyId',
    example: '1',
  })
  @IsOptional()
  @IsInt()
  companyId: number;

  @ApiProperty({
    description: 'Payment value',
    example: '99.55',
  })
  @IsOptional()
  @IsString()
  value: string;
  
  @ApiProperty({
    description: 'Data datedue',
    example: '2022-08-13T16:05:29.000Z',
  })
  @IsOptional()
  @IsString()
  datedue: string;

  @ApiProperty({
    description: 'Type payment default',
    example: 'A Vista',
  })
  @IsString()
  @IsOptional()
  typepayment: string;

  @ApiProperty({
    description: 'Payment status',
    example: 'Pago',
  })
  @IsString()
  @IsOptional()
  status: PaymentStatus;

  @ApiProperty({
    description: 'Payment default observacion',
    example: 'observacion',
  })
  @IsString()
  @IsOptional()
  observacion: string;
}
