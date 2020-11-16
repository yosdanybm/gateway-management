import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { GatewaySchema, Gateway } from './schemas/gateway.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Gateway.name, schema: GatewaySchema }])],
  controllers: [GatewayController],
  providers: [GatewayService]
})
export class GatewayModule {}
