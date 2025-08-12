import {Expose} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class FileRdo {
  @Expose()
  @ApiProperty({
    description: 'The uniq file ID',
    example: '13'
  })
  id: string;

  @Expose()
  @ApiProperty({
    description: 'File name',
    example: 'test.png'
  })
  name: string;

  @Expose()
  @ApiProperty({
    description: 'File url',
    example: './test.png'
  })
  path: string;
}
