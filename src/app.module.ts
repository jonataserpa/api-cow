import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { CompanyModule } from './modules/company/company.module';
import { CattlesModule } from './modules/cattles/cattles.module';
import { PaymentModule } from './modules/payment/payment.module';
import { ReceiptModule } from './modules/receipt/receipt.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule, 
    UserModule, CompanyModule, CattlesModule, PaymentModule, ReceiptModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
