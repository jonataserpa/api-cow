import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { CompanyService } from '../services/company.service';

@ApiTags('company')
@Controller('company')
@ApiBearerAuth()
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @ApiOperation({ summary: 'Company register' })
  @ApiCreatedResponse({
    description: 'Company created',
    type: CreateCompanyDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiBody({ type: CreateCompanyDto })
  create(@Body() createModuleDto: CreateCompanyDto) {
    return this.companyService.create(createModuleDto);
  }

  @Get()
  @ApiOperation({ summary: 'List companys' })
  @ApiOkResponse({
    description: 'List of companys',
    type: CreateCompanyDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  findAll(
    @Query('skip') skip: string,
    @Query('take') take: string,
    @Query('filter') filter: string,
  ) {
    return this.companyService.findAll({
      skip: Number(skip),
      take: Number(take),
      filter: filter,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an company' })
  @ApiOkResponse({ description: 'Get company', type: CreateCompanyDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  findOne(@Param('id') id: number) {
    return this.companyService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Edit an company' })
  @ApiOkResponse({
    description: 'Company updated successfully',
    type: CreateCompanyDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  update(@Param('id') id: number, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an company' })
  @ApiOkResponse({
    description: 'Company deleted successfully',
    type: CreateCompanyDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  remove(@Param('id') id: number) {
    return this.companyService.remove(id);
  }
}
