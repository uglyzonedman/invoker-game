import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class WarningService {
  constructor(private prisma: PrismaService) {}

  async getAllWarningsByUser(id: number) {
    const findWarningByUser = await this.prisma.warning.findMany({
      where: {
        userId: id,
      },
    });

    return findWarningByUser;
  }

  async createNewWarning(id: number) {
    const currentUser = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });

    const findWarningByUser = await this.prisma.warning.findMany({
      where: {
        userId: currentUser.id,
      },
    });

    if (findWarningByUser.length == 2) {
      return await this.prisma.user.update({
        where: {
          id: currentUser.id,
        },
        data: {
          vacBan: true,
        },
      });
    } else {
      return await this.prisma.warning.create({
        data: {
          userId: currentUser.id,
        },
      });
    }
  }
}
