import {Expose} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class LikePostRdo {
  @Expose()
  @ApiProperty({
    description: 'The uniq comment ID',
    example: '13'
  })
  id: string;

  @Expose()
  @ApiProperty({
    description: 'The uniq post ID',
    example: '13'
  })
  postId: string;

  @Expose()
  @ApiProperty({
    description: 'The uniq user ID',
    example: '13'
  })
  userId: string;
}
