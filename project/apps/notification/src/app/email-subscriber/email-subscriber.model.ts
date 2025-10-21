import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EmailSubscriber } from '@project/types';

@Schema({
  collection: 'email-subscribers',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class EmailSubscriberModel extends Document implements EmailSubscriber {
  @Prop({
    required: true,
  })
  public email!: string;

  @Prop({
    required: true,
  })
  public firstname!: string;

  @Prop({
    required: true,
  })
  public lastname!: string;

  public override id?: string;
}

export const EmailSubscriberSchema =
  SchemaFactory.createForClass(EmailSubscriberModel);

EmailSubscriberSchema.virtual('id').get(function () {
  return (this._id as string).toString();
});
