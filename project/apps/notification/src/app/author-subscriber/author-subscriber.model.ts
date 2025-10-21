import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AuthorSubscriber } from '@project/types';

@Schema({
  collection: 'author-subscriptions',
  timestamps: true,
})
export class AuthorSubscriberModel
  extends Document
  implements AuthorSubscriber
{
  @Prop({ required: true })
  public subscriberId!: string;

  @Prop({ required: true })
  public authorId!: string;

  @Prop({ required: true })
  public email!: string;

  public override id?: string;
}

export const AuthorSubscriberSchema = SchemaFactory.createForClass(
  AuthorSubscriberModel
);

AuthorSubscriberSchema.virtual('id').get(function () {
  return (this._id as string).toString();
});
