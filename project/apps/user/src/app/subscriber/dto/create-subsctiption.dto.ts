import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString } from 'class-validator';

export class CreateSubscriptionDto {
  @ApiProperty({
    description: 'User unique address',
    example: 'test@test.com',
  })
  @IsString()
  @IsMongoId()
  public userId!: string;

  @ApiProperty({
    description: 'User first name',
    example: 'John',
  })
  @IsString()
  @IsMongoId()
  public subscriberId!: string;
}
