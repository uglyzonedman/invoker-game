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
    const data = {
      id: userId,
      login,
    };
    return this.jwtService.sign(data, {
      expiresIn: '1h',
      secret: 'misha-krasava-oscar-chyrka',
    });
  }
  generateRefreshToken(userId: number, login: string) {
    const data = {
      id: userId,
      login,
    };
    return this.jwtService.sign(data, {
      expiresIn: '7d',
      secret: 'misha-krasava-oscar-chyrka',
    });
  }

  async register(dto: AuthDto) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        login: dto.login,
      },
    });

    if (existingUser) {
      throw new BadRequestException(
        'Пользователь с таким логином уже существует',
      );
    }

    if (!dto.password || dto.password.length < 8) {
      throw new BadRequestException(
        'Пароль должен содержать минимум 8 символов',
      );
    }

    const hashPassword = await bcrypt.hash(dto.password, this.saltRounds);

    try {
      const newUser = await this.prisma.user.create({
        data: {
          login: dto.login,
          password: hashPassword,
        },
      });

      const keyboards = [
        {
          key: 'q',
          skill: 'quas',
          textColor: '#72c3fc',
          photo: 'invoker_quas.png',
        },
        {
          key: 'w',
          skill: 'wex',
          textColor: '#ce72fc',
          photo: 'invoker_wex.png',
        },
        {
          key: 'e',
          skill: 'exort',
          textColor: '#fcca72',
          photo: 'invoker_exort.png',
        },
        {
          key: 'd',
          skill: 'cast1',
          textColor: '#fff',
          photo: '',
        },
        {
          key: 'f',
          skill: 'cast2',
          textColor: '#fff',
          photo: '',
        },
        {
          key: 'r',
          skill: 'invoke',
          textColor: '#fff',
          photo: 'invoker_invoke.png',
        },
      ];
      await Promise.all(
        keyboards.map((keyboard) =>
          this.prisma.userKeyboard.create({
            data: {
              key: keyboard.key,
              skill: keyboard.skill,
              userId: newUser.id,
              textColor: keyboard.textColor,
              photo: keyboard.photo,
            },
          }),
        ),
      );

      return {
        message: 'Пользователь успешно создан',
        data: newUser,
      };
    } catch (error) {
      throw new BadRequestException('Ошибка при создании пользователя', error);
    }
  }

  async login(dto: AuthDto) {
    const currentUser = await this.prisma.user.findFirst({
      where: {
        login: dto.login,
      },
    });

    if (!currentUser) {
      throw new BadRequestException('Пользователь с таким логином не найден');
    }

    const isPasswordValid = await bcrypt.compare(
      dto.password,
      currentUser.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Неверный пароль');
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
      message: 'Вход выполнен успешно',
      user: {
        id: currentUser.id,
        login: currentUser.login,
      },
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }
}
