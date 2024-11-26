import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/decorators/auth.decorator';
import { CurrentUser } from 'src/decorators/user.decorator';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { existsSync } from 'fs';
import { UpdateKeyboardDto, UpdateProfileDto } from './user.dto';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @Auth()
  async getProfile(@CurrentUser('id') id: number) {
    return await this.userService.getProfile(id);
  }

  @Put('update-profile')
  @Auth()
  async updateProfile(
    @CurrentUser('id') id: number,
    @Body() dto: UpdateProfileDto,
  ) {
    return await this.userService.updateProfile(id, dto);
  }

  @Put('update-keyboard')
  @Auth()
  async updateKeyboardProfile(
    @CurrentUser('id') id: number,
    @Body() dto: UpdateKeyboardDto[],
  ) {
    return await this.userService.updateKeyboardProfile(id, dto);
  }

  @Post('upload-avatar')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: 'uploads/avatars',
        filename: (req, file, callback) => {
          const fileName = `${Date.now()}-${file.originalname}`;
          callback(null, fileName);
        },
      }),
      limits: { fileSize: 1073741824 },
      fileFilter: (req, file, callback) => {
        callback(null, true);
      },
    }),
  )
  async addPhotoInEvent(@UploadedFile() file: Express.Multer.File) {
    const fileName = file.filename;
    return { file: fileName };
  }

  @Get('get-avatar/:fileName')
  getFileEvent(@Param('fileName') fileName: string, @Res() res: any): void {
    const filePath = join(process.cwd(), 'uploads/avatars', fileName);

    if (!existsSync(filePath)) {
      throw new BadRequestException('Указанный файл не существует');
    }

    return res.sendFile(filePath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        throw new BadRequestException('Ошибка при отправке файла');
      }
    });
  }

  @Get('get-photo-skill/:fileName')
  getPhotoSkill(@Param('fileName') fileName: string, @Res() res: any): void {
    const filePath = join(process.cwd(), 'uploads/keys', fileName);

    if (!existsSync(filePath)) {
      throw new BadRequestException('Указанный файл не существует');
    }

    return res.sendFile(filePath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        throw new BadRequestException('Ошибка при отправке файла');
      }
    });
  }
}
