import { Module } from '@nestjs/common';
import { PrismaService } from 'src/config/database/PrismaService';
import { CattlesController } from './controllers/cattles.controller';
import { CattlesService } from './services/cattles.service';

@Module({
  controllers: [CattlesController],
  providers: [CattlesService, PrismaService]
})
export class CattlesModule {}
