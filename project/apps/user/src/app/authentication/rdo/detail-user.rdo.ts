import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class DetailUserRdo {
  @Expose()
  @ApiProperty({
    description: 'The uniq user ID',
    example: '13',
  })
  public id!: string;

  @Expose()
  @ApiProperty({
    description: 'User registration date',
    example: '2025-08-11T07:01:32.001Z',
  })
  public registrationDate!: string;

  @Expose()
  @ApiProperty({
    description: 'Number of user posts',
    example: '0',
  })
  public postCount!: number;

  @Expose()
  @ApiProperty({
    description: 'Number of user subscribers',
    example: '0',
  })
  public subscriberCount!: number;
}
