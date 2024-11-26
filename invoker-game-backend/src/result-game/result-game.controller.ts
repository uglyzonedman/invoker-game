import { Body, Controller, Get, Post } from '@nestjs/common';
import { ResultGameService } from './result-game.service';
import { Auth } from 'src/decorators/auth.decorator';
import { CurrentUser } from 'src/decorators/user.decorator';
import { ResultGameAdd } from './result-game.dto';

@Controller('result-game')
export class ResultGameController {
  constructor(private readonly resultGameService: ResultGameService) {}

  @Post('create-result')
  @Auth()
  async createResult(
    @CurrentUser('id') id: number,
    @Body() dto: ResultGameAdd,
  ) {
    return this.resultGameService.createResult(id, dto);
  }

  @Get('all')
  async getAllResults() {
    return this.resultGameService.getAllResults();
  }
}
