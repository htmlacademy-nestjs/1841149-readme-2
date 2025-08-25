import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {
  @ApiProperty({
    description: 'Uniq tag name',
    example: 'city'
  })
  public title!: string;
}
