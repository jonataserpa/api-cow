import { Module } from '@nestjs/common';
import { PrismaService } from 'src/config/database/PrismaService';
import { CompanyController } from './controllers/company.controller';
import { CompanyService } from './services/company.service';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, PrismaService]
})
export class CompanyModule {}
