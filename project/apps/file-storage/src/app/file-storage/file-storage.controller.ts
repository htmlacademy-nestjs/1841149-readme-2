import {Body, Controller, Get, HttpStatus, Param, Post} from "@nestjs/common";
import {FileStorageService} from "./file-storage.service";
import {UploadFileDto} from "./dto/upload-file.dto";
import {fillDto} from "@project/helpers";
import {FileRdo} from "./rdo/file.rdo";
import {ApiResponse} from "@nestjs/swagger";

@Controller('files')
export class FileStorageController {
  constructor(
    private readonly fileStorageService: FileStorageService,
  ) {}

  @ApiResponse({
    type: FileRdo,
    status: HttpStatus.OK,
    description: 'Successfully upload image',
  })
  @Post('/upload')
  public async uploadFile(@Body() dto: UploadFileDto) {
    const newFile = await this.fileStorageService.uploadFile(dto);

    return fillDto(FileRdo, newFile.toObject());
  }

  @ApiResponse({
    type: FileRdo,
    status: HttpStatus.OK,
    description: 'Uploaded image',
  })
  @Get(':fileId')
  public async getFile(@Param('fileId') fileId: string) {
    const file = await this.fileStorageService.getFile(fileId);

    fillDto(FileRdo, file.toObject());
  }
}
