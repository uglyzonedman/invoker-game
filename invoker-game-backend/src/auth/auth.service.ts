import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthDto } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  private readonly saltRounds = 10;

  generateAccessToken(userId: number, login: string) {
    return this.jwtService.sign({ userId, login }, { expiresIn: '1h' });
  }

  generateRefreshToken(userId: number, login: string) {
    return this.jwtService.sign({ userId, login }, { expiresIn: '7d' });
  }

  async register(dto: AuthDto) {
    const checkUser = await this.prisma.user.findFirst({
      where: {
        login: dto.login,
      },
    });

    if (checkUser) {
      return new BadRequestException('Test');
    }

    let hashPassword: any;

    if (dto.password) {
      if (dto.password.length < 8) {
        return new BadRequestException('Оскар - иди нахуй');
      } else {
        hashPassword = await bcrypt.hash(dto.password, this.saltRounds);
      }
    }

    const newUser = await this.prisma.user.create({
      data: {
        login: dto.login,
        password: await hashPassword,
        createdAt: String(new Date()),
        updatedAt: String(new Date()),
      },
    });

    if (newUser) {
      return {
        message: 'Ползователь успешно создан',
        data: newUser,
      };
    }
  }

  async login(dto: AuthDto) {
    const currentUser = await this.prisma.user.findFirst({
      where: {
        login: dto.login,
      },
    });
    if (!currentUser) {
      return new BadRequestException('Такого логина нет');
    }

    const checkPassword = await bcrypt.compare(
      dto.password,
      currentUser.password,
    );

    if (!checkPassword) {
      return new BadRequestException('Пароли не совпадают');
    }

    const accessToken = this.generateAccessToken(
      currentUser.id,
      currentUser.login,
    );
    const refreshToken = this.generateRefreshToken(
      currentUser.id,
      currentUser.login,
    );

    return {
      message: 'Успешно',
      user: currentUser,
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }
}
