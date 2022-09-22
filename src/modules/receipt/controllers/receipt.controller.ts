import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateReceiptDto } from '../dto/create-receipt.dto';
import { UpdateReceiptDto } from '../dto/update-receipt.dto';
import { ReceiptService } from '../services/receipt.service';

@Controller('receipt')
export class ReceiptController {
  constructor(private readonly receiptService: ReceiptService) {}

  @Post()
  @ApiOperation({ summary: 'Receipt register' })
  @ApiCreatedResponse({
    description: 'Receipt created',
    type: CreateReceiptDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiBody({ type: CreateReceiptDto })
  create(@Body() createModuleDto: CreateReceiptDto) {
    return this.receiptService.create(createModuleDto);
  }

  @Get()
  @ApiOperation({ summary: 'List cattles' })
  @ApiOkResponse({
    description: 'List of cattles',
    type: CreateReceiptDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  findAll(
    @Query('skip') skip: string,
    @Query('take') take: string,
    @Query('filter') filter: string,
  ) {
    return this.receiptService.findAll({
      skip: Number(skip),
      take: Number(take),
      filter: filter,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an Receipt' })
  @ApiOkResponse({ description: 'Get Receipt', type: CreateReceiptDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  findOne(@Param('id') id: number) {
    return this.receiptService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Edit an Receipt' })
  @ApiOkResponse({
    description: 'Receipt updated successfully',
    type: CreateReceiptDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  update(@Param('id') id: number, @Body() updateReceiptDto: UpdateReceiptDto) {
    return this.receiptService.update(id, updateReceiptDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an Receipt' })
  @ApiOkResponse({
    description: 'Receipt deleted successfully',
    type: CreateReceiptDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  remove(@Param('id') id: number) {
    return this.receiptService.remove(id);
  }
}
