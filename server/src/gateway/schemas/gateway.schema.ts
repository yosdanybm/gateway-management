import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Device } from '../../device/schemas/device.schema';

@Schema()
export class Gateway extends Document {
  @Prop({ required: true, unique: true })
  serial: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, validate: [/\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/, 'IPV4 address is invalid.'] })
  address: string;

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: Device }])
  devices: [Device];
}

export const GatewaySchema = SchemaFactory.createForClass(Gateway);
