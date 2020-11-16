/* eslint-disable @typescript-eslint/ban-types */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Gateway } from '../gateway/schemas/gateway.schema';
import { CreateDeviceDto } from './dto/create-device.dto';
import { Device } from './schemas/device.schema';

@Injectable()
export class DeviceService {
    constructor(
        @InjectModel(Device.name) private readonly deviceModel: Model<Device>, 
        @InjectModel(Gateway.name) private readonly gatewayModel: Model<Gateway>
    ) { }

    async findAll(query) {
        const { page = 1, limit = 10 } = query;
        const where = {};
        const skip = (+page - 1) * +limit;
        const sort = { name: 'desc' } || undefined;

        if (page < 1) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'The page must be greater than 0',
              }, HttpStatus.FORBIDDEN);
		}

		if (limit < 1) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'The limit must be greater than 0',
              }, HttpStatus.FORBIDDEN);
		}

        const items = await this.deviceModel.find()
            .where(where)
            .skip(skip)
            .limit(+limit)
            .sort(sort)
            .exec();

        const total = await this.deviceModel.countDocuments();

        return { 
            items,
            hasPreviousPage: skip > 0 && items.length > 0 ? true : false,
            hasNextPage: (+limit + skip) < total ? true : false,
            total
        };
    }


    async findOne(options: object): Promise<Device> {
        const device = await this.deviceModel.findOne(options).exec();

        if (!device) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Device not found',
              }, HttpStatus.NOT_FOUND);
        }

        return device;
    }

    async findById(ID: number): Promise<Device> {
        const device = await this.deviceModel.findById(ID).exec();

        if (!device) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Device not found',
              }, HttpStatus.NOT_FOUND);
        }

        return device;
    }

    async create(createDeviceDto: CreateDeviceDto): Promise<Device> {
        const device = await this.deviceModel.findOne({ uid: createDeviceDto.uid}).exec();

        if (device) {
            throw new HttpException({
                status: HttpStatus.OK,
                error: 'UID must be unique',
              }, HttpStatus.OK);
        }

        const { idGateway , ...rest} = createDeviceDto;
        const countDevices = await this.countDevicesAdded(idGateway);

        if (countDevices > 9) {
            throw new HttpException({
                status: HttpStatus.OK,
                error: 'They are not allowed more than 10 devices per gateway',
              }, HttpStatus.OK);
        }

        const createdDevice = new this.deviceModel(rest);
        const resultDevice = await createdDevice.save();

        await this.gatewayModel.findOneAndUpdate(
            { _id: idGateway },
            { $push: { devices: resultDevice } }
          );
        
        return resultDevice;
    }

    async update(ID: number, newValue: Device): Promise<Device> {
        const device = await this.deviceModel.findById(ID).exec();

        if (!device) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Device not found',
              }, HttpStatus.NOT_FOUND);
        }

        await this.deviceModel.findByIdAndUpdate(ID, newValue).exec();
        return await this.deviceModel.findById(ID).exec();
    }

    async delete(ID: number): Promise<Device> {
        return await this.deviceModel.findByIdAndRemove(ID).exec();
    }

    async countDevicesAdded(IdGateway: number): Promise<number> {
        const gateway = await this.gatewayModel.findById(IdGateway).exec();

        if (gateway) {
            return gateway.devices.length;
        }

        return 0;
    }
}
