import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      secret: 'misha-krasava-oscar-chyrka',
    }),
  ],
  providers: [AuthService, PrismaService],
})
export class AuthModule {}
