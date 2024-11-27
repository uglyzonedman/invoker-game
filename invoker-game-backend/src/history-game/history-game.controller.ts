import { Body, Controller, Get, Post } from '@nestjs/common';
import { HistoryGameService } from './history-game.service';
import { Auth } from 'src/decorators/auth.decorator';
import { CurrentUser } from 'src/decorators/user.decorator';
import { CreateHistoryGameDto } from './history-game.dto';

@Controller('history-game')
export class HistoryGameController {
  constructor(private readonly historyGameService: HistoryGameService) {}

  @Get('get-all-by-user')
  @Auth()
  async getAllHistoryGameByUser(@CurrentUser('id') id: number) {
    return this.historyGameService.getAllHistoryGameByUser(id);
  }

  @Post('create-history')
  @Auth()
  async createHistoryGame(
    @CurrentUser('id') id: number,
    @Body() dto: CreateHistoryGameDto,
  ) {
    return this.historyGameService.createHistoryGame(id, dto);
  }
}
