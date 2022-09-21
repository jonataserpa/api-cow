import { Module } from '@nestjs/common';
import { PrismaService } from 'src/config/database/PrismaService';
import { ReceiptController } from './controllers/receipt.controller';
import { ReceiptService } from './services/receipt.service';

@Module({
  controllers: [ReceiptController],
  providers: [ReceiptService, PrismaService]
})
export class ReceiptModule {}
