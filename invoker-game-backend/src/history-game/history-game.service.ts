import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateHistoryGameDto } from './history-game.dto';

@Injectable()
export class HistoryGameService {
  constructor(private prisma: PrismaService) {}
  async createHistoryGame(id: number, dto: CreateHistoryGameDto) {
    return await this.prisma.historyGame.create({
      data: {
        userId: id,
        resultId: dto.resultId,
      },
    });
  }

  async getAllHistoryGameByUser(id: number) {
    return await this.prisma.historyGame.findMany({
      where: { userId: id },
      include: {
        resultGame: true,
      },
    });
  }
}
