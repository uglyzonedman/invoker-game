import { Module } from '@nestjs/common';
import { HistoryGameService } from './history-game.service';
import { HistoryGameController } from './history-game.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [HistoryGameController],
  providers: [HistoryGameService, PrismaService],
})
export class HistoryGameModule {}
