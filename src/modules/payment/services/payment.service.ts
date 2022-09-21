import { Injectable } from '@nestjs/common';
import { PaymentStatus } from '@prisma/client';
import { PrismaService } from 'src/config/database/PrismaService';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { UpdatePaymentDto } from '../dto/update-payment.dto';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async create(paymentDto: CreatePaymentDto) {
    const payment = await this.prisma.payment.create({
      data: {
        description: paymentDto.description,
        companyId: paymentDto.companyId,
        datedue: paymentDto.datedue,
        observacion: paymentDto.observacion,
        status: (paymentDto.status) as PaymentStatus,
        typepayment: paymentDto.typepayment,
        value: paymentDto.value,
      },
    });

    return payment;
  }

  async findAll(params: { skip?: number; take?: number; filter?: string }) {
    const { skip, take, filter } = params;
    let data;

    if (isNaN(skip)) {
      data = await this.prisma.payment.findMany();
    } else {
      data = await this.prisma.payment.findMany({
        skip,
        take,
        where: {
          description: {
            contains: filter,
          },
        },
        orderBy: {
          id: 'desc',
        }
      });
    }

    const totalCount = await this.prisma.payment.findMany();

    const dataPayment = {
      data,
      headers: totalCount.length === 1 ? 1 : totalCount.length - 1,
    };
    return dataPayment;
  }

  findOne(id: number) {
    return this.prisma.payment.findUnique({
      where: { id },
    });
  }

  async update(id: number, paymentDto: UpdatePaymentDto) {
    const cattle = await this.prisma.payment.findUnique({
      where: { id },
    });

    if (!cattle) {
      throw new Error(`payment ${id} does not exist`);
    }

    const updatePayment = await this.prisma.payment.update({
      data: {
        description: paymentDto.description,
        companyId: paymentDto.companyId,
        datedue: paymentDto.datedue,
        observacion: paymentDto.observacion,
        status: (paymentDto.status) as PaymentStatus,
        typepayment: paymentDto.typepayment,
        value: paymentDto.value,
      },
      where: { id },
    });

    return updatePayment;
  }

  async remove(id: number) {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
    });

    if (!payment) {
      throw new Error(`payment does not exist`);
    }

    return await this.prisma.payment.delete({
      where: { id },
    });
  }
}
