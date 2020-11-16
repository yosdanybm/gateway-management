import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GatewayModule } from './gateway/gateway.module';
import { DeviceModule } from './device/device.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://user:password@localhost:27017/managing_gateways', {
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
