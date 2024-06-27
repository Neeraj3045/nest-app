import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, Document } from 'mongoose';

export enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;

  @Prop({ default: Status.ACTIVE })
  status: Status;
}

export const UserSchema = SchemaFactory.createForClass(User);
