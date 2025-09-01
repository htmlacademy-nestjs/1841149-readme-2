import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UploadedFileRdo {
  @Expose()
  @ApiProperty({
    description: 'The uniq file ID',
    example: '13',
  })
  public id!: string;

  @Expose()
  @ApiProperty({
    description: 'Original file name',
    example: 'test',
  })
  public originalName!: string;

  @Expose()
  @ApiProperty({
    description: 'Hash file name',
    example: '123123123',
  })
  public hashName!: string;

  @Expose()
  @ApiProperty({
    description: 'Subdirectory for file',
    example: '123123123.png',
  })
  public subDirectory!: string;

  @Expose()
  @ApiProperty({
    description: 'Type of file',
    example: '123123123.png',
  })
  public mimetype!: string;

  @Expose()
  @ApiProperty({
    description: 'Size of file',
    example: '1234',
  })
  public size!: number;
}
