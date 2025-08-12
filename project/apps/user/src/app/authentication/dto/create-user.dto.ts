import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique address',
    example: 'test@test.com'
  })
  public email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'John'
  })
  public firstName: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Doe'
  })
  public lastName: string;

  @ApiProperty({
    description: 'User password',
    example: 'secret'
  })
  public password: string;

  @ApiProperty({
    description: 'avatar url',
    example: 'test.png'
  })
  public avatarUrl?: string;
}
