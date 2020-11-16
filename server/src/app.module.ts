/* eslint-disable @typescript-eslint/no-var-requires */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GatewayModule } from './gateway/gateway.module';
import { DeviceModule } from './device/device.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:root@localhost:27017/managing_gateways?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false', {
      useCreateIndex: true,
      useFindAndModify: false,
      connectionFactory: (connection) => {
        connection.plugin(require('mongoose-timestamp'));
        return connection;
      }
    }),
    GatewayModule,
    DeviceModule,
  ],
})
export class AppModule { }
