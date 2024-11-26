import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateKeyboardDto, UpdateProfileDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getProfile(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        UserKeyboard: true,
      },
    });
  }

  async updateProfile(id: number, dto: UpdateProfileDto) {
    const currentUser = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!currentUser) {
      throw new BadRequestException('Такого пользователя нет');
    }
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        avatarPath: dto.avatarPath ? dto.avatarPath : currentUser.avatarPath,
        login: dto.login ? dto.login : currentUser.login,
      },
    });
  }

  async updateKeyboardProfile(id: number, dto: any) {
    console.log(dto.keyboards); // Check if the data is correct
    return await Promise.all(
      dto.keyboards.map((keyboard) =>
        this.prisma.userKeyboard.update({
          where: {
            id: keyboard.id, // Ensure that keyboard has an id
          },
          data: {
            key: keyboard.key,
          },
        }),
      ),
    );
  }
}
