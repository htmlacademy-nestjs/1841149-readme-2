import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'subscribers',
  timestamps: true,
})
export class SubscriberModel extends Document {
  @Prop({ required: true })
  public userId!: string;

  @Prop({ required: true })
  public subscriberId!: string;

  @Prop()
  public createdAt!: Date;
}

export const SubscriberSchema = SchemaFactory.createForClass(SubscriberModel);
