import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DeviceStatus } from '../enum/device.enum';

@Schema()
export class Device extends Document {
  @Prop({ required: true, unique: true })
  uid: number;

  @Prop({ required: true })
  vendor: string;

  @Prop({ required: true })
  status: DeviceStatus;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
