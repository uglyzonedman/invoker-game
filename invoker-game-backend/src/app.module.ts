import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ResultGameModule } from './result-game/result-game.module';
import { HistoryGameModule } from './history-game/history-game.module';

@Module({
  imports: [UserModule, AuthModule, ResultGameModule, HistoryGameModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
