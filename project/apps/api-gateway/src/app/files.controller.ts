import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApplicationServiceURL } from './app.config';
import { HttpService } from '@nestjs/axios';
import type { Request, Response } from 'express';
import { CheckAuthGuard } from './guards/check-auth.guard';

@Controller('files')
export class FilesController {
  constructor(private readonly httpService: HttpService) {}

  @UseGuards(CheckAuthGuard)
  @Post('upload')
  public async create(@Req() req: Request, @Res() res: Response) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Files}/upload`,
      req,
      {
        headers: {
          ...req.headers,
        },
      }
    );

    res.send(data);
  }

  @Get(':fileId')
  public async index(@Param('fileId') fileId: string) {
    const { data } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Files}/${fileId}`
    );

    return data;
  }
}
