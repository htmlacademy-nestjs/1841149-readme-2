import {Expose} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class PhotoPostRdo {
  @Expose()
  @ApiProperty({
    description: 'Link to photo',
    example: '/test.jpg'
  })
  photo!: string;
}
