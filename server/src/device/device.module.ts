import { Gateway, GatewaySchema } from './../gateway/schemas/gateway.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';
import { Device, DeviceSchema } from './schemas/device.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Device.name, schema: DeviceSchema }, { name: Gateway.name, schema: GatewaySchema }])],
  controllers: [DeviceController],
  providers: [DeviceService]
})
export class DeviceModule {}
