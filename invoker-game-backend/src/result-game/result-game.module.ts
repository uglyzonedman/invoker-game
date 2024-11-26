import { Module } from '@nestjs/common';
import { ResultGameService } from './result-game.service';
import { ResultGameController } from './result-game.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ResultGameController],
  providers: [ResultGameService, PrismaService],
})
export class ResultGameModule {}
