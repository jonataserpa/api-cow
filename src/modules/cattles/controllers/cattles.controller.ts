import { Controller, Get, Post, Body, Param, Delete, Query, Put } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CreateCattleDto } from '../dto/create-cattle.dto';
import { UpdateCattleDto } from '../dto/update-cattle.dto';
import { CattlesService } from '../services/cattles.service';

@Controller('cattles')
export class CattlesController {
  constructor(private readonly cattlesService: CattlesService) {}

  @Post()
  @ApiOperation({ summary: 'Cattles register' })
  @ApiCreatedResponse({
    description: 'Cattles created',
    type: CreateCattleDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiBody({ type: CreateCattleDto })
  create(@Body() createModuleDto: CreateCattleDto) {
    return this.cattlesService.create(createModuleDto);
  }

  @Get()
  @ApiOperation({ summary: 'List cattles' })
  @ApiOkResponse({
    description: 'List of cattles',
    type: CreateCattleDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  findAll(
    @Query('skip') skip: string,
    @Query('take') take: string,
    @Query('filter') filter: string,
  ) {
    return this.cattlesService.findAll({
      skip: Number(skip),
      take: Number(take),
      filter: filter,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an cattles' })
  @ApiOkResponse({ description: 'Get cattles', type: CreateCattleDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  findOne(@Param('id') id: number) {
    return this.cattlesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Edit an cattles' })
  @ApiOkResponse({
    description: 'Cattles updated successfully',
    type: CreateCattleDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  update(@Param('id') id: number, @Body() UpdateCattleDto: UpdateCattleDto) {
    return this.cattlesService.update(id, UpdateCattleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an cattles' })
  @ApiOkResponse({
    description: 'Cattles deleted successfully',
    type: CreateCattleDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  remove(@Param('id') id: number) {
    return this.cattlesService.remove(id);
  }
}
