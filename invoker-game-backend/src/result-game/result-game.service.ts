import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ResultGameAdd } from './result-game.dto';

@Injectable()
export class ResultGameService {
  constructor(private prisma: PrismaService) {}

  async createResult(id: number, dto: ResultGameAdd) {
    const currentUser = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    console.log('Current user:', currentUser);

    const checkResultsGame = await this.prisma.resultGame.findFirst({
      where: {
        userId: currentUser.id,
      },
    });

    console.log('Existing result game:', checkResultsGame);

    if (checkResultsGame) {
      console.log('Existing result:', checkResultsGame.result);
      console.log('New result:', dto.result);

      if (+checkResultsGame.result > +dto.result) {
        await this.prisma.resultGame.update({
          where: {
            id: checkResultsGame.id,
          },
          data: {
            result: dto.result,
            userId: id,
            gameMode: dto.gameMode,
          },
        });
        console.log('Updated result game');
      }
    } else {
      await this.prisma.resultGame.create({
        data: {
          result: dto.result,
          userId: id,
          gameMode: dto.gameMode,
        },
      });
      console.log('Created new result game');
    }
  }

  async getAllResults() {
    return await this.prisma.resultGame.findMany({
      include: {
        user: true,
      },
    });
  }
}