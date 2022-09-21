import { Module } from '@nestjs/common';
import { PrismaService } from 'src/config/database/PrismaService';
import { PaymentController } from './controllers/payment.controller';
import { PaymentService } from './services/payment.service';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, PrismaService]
})
export class PaymentModule {}
