import { Controller, Get, Post } from '@nestjs/common';
import { WarningService } from './warning.service';
import { Auth } from 'src/decorators/auth.decorator';
import { CurrentUser } from 'src/decorators/user.decorator';

@Controller('warning')
export class WarningController {
  constructor(private readonly warningService: WarningService) {}

  @Get('get-all-by-user')
  @Auth()
  async findWarningByUser(@CurrentUser('id') id: number) {
    return this.warningService.getAllWarningsByUser(id);
  }

  @Post('create-warning')
  @Auth()
  async createNewWarning(@CurrentUser('id') id: number) {
    return this.warningService.createNewWarning(id);
  }
}
