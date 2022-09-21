import { Injectable } from '@nestjs/common';
import { PaymentStatus } from '@prisma/client';
import { PrismaService } from 'src/config/database/PrismaService';
import { CreateReceiptDto } from '../dto/create-receipt.dto';
import { UpdateReceiptDto } from '../dto/update-receipt.dto';

@Injectable()
export class ReceiptService {
  constructor(private prisma: PrismaService) {}

  async create(receiptDto: CreateReceiptDto) {
    const receipt = await this.prisma.receipt.create({
      data: {
        description: receiptDto.description,
        companyId: receiptDto.companyId,
        observacion: receiptDto.observacion,
        status: (receiptDto.status) as PaymentStatus,
        value: receiptDto.value,
      },
    });

    return receipt;
  }

  async findAll(params: { skip?: number; take?: number; filter?: string }) {
    const { skip, take, filter } = params;
    let data;

    if (isNaN(skip)) {
      data = await this.prisma.receipt.findMany();
    } else {
      data = await this.prisma.receipt.findMany({
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

    const totalCount = await this.prisma.receipt.findMany();

    const dataReceipt = {
      data,
      headers: totalCount.length === 1 ? 1 : totalCount.length - 1,
    };
    return dataReceipt;
  }

  findOne(id: number) {
    return this.prisma.receipt.findUnique({
      where: { id },
    });
  }

  async update(id: number, receiptDto: UpdateReceiptDto) {
    const receipt = await this.prisma.receipt.findUnique({
      where: { id },
    });

    if (!receipt) {
      throw new Error(`receipt ${id} does not exist`);
    }

    const updateReceipt = await this.prisma.receipt.update({
      data: {
        description: receiptDto.description,
        companyId: receiptDto.companyId,
        observacion: receiptDto.observacion,
        status: (receiptDto.status) as PaymentStatus,
        value: receiptDto.value,
      },
      where: { id },
    });

    return updateReceipt;
  }

  async remove(id: number) {
    const receipt = await this.prisma.receipt.findUnique({
      where: { id },
    });

    if (!receipt) {
      throw new Error(`receipt does not exist`);
    }

    return await this.prisma.receipt.delete({
      where: { id },
    });
  }
}
