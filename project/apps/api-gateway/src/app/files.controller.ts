import {
  Controller,
  Get,
  HttpStatus,
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
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { BadRequestErrorRdo } from './rdo/bad-request-error.rdo';
import { UnauthorizedErrorRdo } from './rdo/unathorized-error.rdo';
import { InternalErrorRdo } from './rdo/internal-error.rdo';
import { FileRdo } from './rdo/file.rdo';

@Controller('files')
export class FilesController {
  constructor(private readonly httpService: HttpService) {}

  @ApiResponse({
    type: FileRdo,
    status: HttpStatus.OK,
    description: 'Uploaded file info',
  })
  @ApiResponse({
    type: BadRequestErrorRdo,
    status: HttpStatus.BAD_REQUEST,
    description: 'Not correct data',
  })
  @ApiResponse({
    type: UnauthorizedErrorRdo,
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  @ApiResponse({
    type: InternalErrorRdo,
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal error',
  })
  @ApiBearerAuth()
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

  @ApiResponse({
    type: FileRdo,
    status: HttpStatus.OK,
    description: 'Uploaded file info',
  })
  @ApiResponse({
    type: BadRequestErrorRdo,
    status: HttpStatus.BAD_REQUEST,
    description: 'Not correct data',
  })
  @ApiResponse({
    type: UnauthorizedErrorRdo,
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  @ApiResponse({
    type: InternalErrorRdo,
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal error',
  })
  @ApiBearerAuth()
  @Get(':fileId')
  public async index(@Param('fileId') fileId: string) {
    const { data } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Files}/${fileId}`
    );

    return data;
  }
}
