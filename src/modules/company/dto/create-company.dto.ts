import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';
import constants from 'src/config/constants';
import { UserAddressDto } from 'src/modules/user/dto/userAddress.dto';

export class CreateCompanyDto {
  @ApiProperty({
    description: 'Company default',
    example: 'Company test',
  })
  @Length(constants.STRING_MIN, constants.STRING_MAX)
  @IsString()
  reasonsocial: string;

  @ApiProperty({
    description: 'Name fantasy default',
    example: 'Name fantasy default company',
  })
  @Length(constants.STRING_MIN, constants.STRING_MAX)
  @IsString()
  namefantasy: string;

  @ApiProperty({
    description: 'CNPJ default company',
    example: '51.809.203/0001-64',
  })
  @Length(constants.CNPJ_MIN_PHONE)
  @IsString()
  CNPJ: string;

  @ApiProperty({
    description: 'Phone default company',
    example: '(35)9.9743-3853',
  })
  @Length(constants.NUMBER_MIN_PHONE)
  @IsString()
  phone: string;

  @IsOptional()
  address: UserAddressDto[];
}
