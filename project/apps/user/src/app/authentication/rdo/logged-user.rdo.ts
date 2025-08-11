import {Expose} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class LoggedUserRdo {
  @Expose()
  @ApiProperty({
    description: 'The uniq user ID',
    example: '13'
  })
  public id: string;

  @Expose()
  @ApiProperty({
    description: 'User email',
    example: 'test@test.com'
  })
  public email: string;

  @Expose()
  @ApiProperty({
    description: 'User access token',
    example: 'asdasd123.asdasd123.asdasd123'
  })
  public accessToken: string;
}
