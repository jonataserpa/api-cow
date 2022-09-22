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
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { UpdatePaymentDto } from '../dto/update-payment.dto';
import { PaymentService } from '../services/payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiOperation({ summary: 'Payment register' })
  @ApiCreatedResponse({
    description: 'Payment created',
    type: CreatePaymentDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiBody({ type: CreatePaymentDto })
  create(@Body() createModuleDto: CreatePaymentDto) {
    return this.paymentService.create(createModuleDto);
  }

  @Get()
  @ApiOperation({ summary: 'List Payments' })
  @ApiOkResponse({
    description: 'List of Payments',
    type: CreatePaymentDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  findAll(
    @Query('skip') skip: string,
    @Query('take') take: string,
    @Query('filter') filter: string,
  ) {
    return this.paymentService.findAll({
      skip: Number(skip),
      take: Number(take),
      filter: filter,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an Payment' })
  @ApiOkResponse({ description: 'Get Payment', type: CreatePaymentDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  findOne(@Param('id') id: number) {
    return this.paymentService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Edit an Payment' })
  @ApiOkResponse({
    description: 'Payment updated successfully',
    type: CreatePaymentDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  update(@Param('id') id: number, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(id, updatePaymentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an Payment' })
  @ApiOkResponse({
    description: 'Payment deleted successfully',
    type: CreatePaymentDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  remove(@Param('id') id: number) {
    return this.paymentService.remove(id);
  }
}
