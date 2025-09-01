import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AuthUser } from '@project/types';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class BlogUserModel extends Document implements AuthUser {
  @Prop({
    required: true,
    unique: true,
  })
  public email!: string;

  @Prop({
    required: true,
  })
  public firstName!: string;

  @Prop({
    required: true,
  })
  public lastName!: string;

  @Prop()
  public avatarUrl!: string;

  @Prop({
    required: true,
  })
  public registrationDate!: string;

  @Prop({
    required: true,
  })
  public postCount!: number;

  @Prop({
    required: true,
  })
  public subscriberCount!: number;

  @Prop({
    required: true,
  })
  passwordHash!: string;
}

export const BlogUserSchema = SchemaFactory.createForClass(BlogUserModel);
