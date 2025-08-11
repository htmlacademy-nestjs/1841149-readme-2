import {Expose} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class UserRdo {
  @Expose()
  @ApiProperty({
    description: 'The uniq user ID',
    example: '13'
  })
  public id: string;

  @Expose()
  @ApiProperty({
    description: 'User name',
    example: 'John'
  })
  public firstName: string;

  @Expose()
  @ApiProperty({
    description: 'User last name',
    example: 'John'
  })
  public lastName: string;

  @Expose()
  @ApiProperty({
    description: 'User email',
    example: 'test@test.com'
  })
  public email: string;

  @Expose()
  @ApiProperty({
    description: 'User avatr url',
    example: 'john.png'
  })
  public avatarUrl: string;
}
