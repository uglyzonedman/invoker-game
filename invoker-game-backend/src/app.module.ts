import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ResultGameModule } from './result-game/result-game.module';
import { HistoryGameModule } from './history-game/history-game.module';
import { WarningModule } from './warning/warning.module';

@Module({
  imports: [UserModule, AuthModule, ResultGameModule, HistoryGameModule, WarningModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
