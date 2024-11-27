import { Module } from '@nestjs/common';
import { WarningService } from './warning.service';
import { WarningController } from './warning.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [WarningController],
  providers: [WarningService, PrismaService],
})
export class WarningModule {}
