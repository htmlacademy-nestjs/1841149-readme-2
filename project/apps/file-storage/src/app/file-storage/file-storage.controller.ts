import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileStorageService } from './file-storage.service';
import { fillDto } from '@project/helpers';
import { UploadedFileRdo } from './rdo/uploaded-file.rdo';
import { ApiResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { MongoIdValidationPipe } from '@project/core';

@Controller('files')
export class FileStorageController {
  constructor(private readonly fileStorageService: FileStorageService) {}

  @ApiResponse({
    type: UploadedFileRdo,
    status: HttpStatus.OK,
    description: 'Successfully upload image',
  })
  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileEntity = await this.fileStorageService.saveFile(file);
    return fillDto(UploadedFileRdo, fileEntity);
  }

  @ApiResponse({
    type: UploadedFileRdo,
    status: HttpStatus.OK,
    description: 'Uploaded image',
  })
  @Get(':fileId')
  public async show(@Param('fileId', MongoIdValidationPipe) fileId: string) {
    const existFile = await this.fileStorageService.getFile(fileId);
    return fillDto(UploadedFileRdo, existFile);
  }
}
