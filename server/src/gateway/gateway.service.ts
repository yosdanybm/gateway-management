/* eslint-disable @typescript-eslint/ban-types */
import { Gateway } from './schemas/gateway.schema';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGatewayDto } from './dto/create-gateway.dto';

@Injectable()
export class GatewayService {

    constructor(@InjectModel(Gateway.name) private readonly gatewayModel: Model<Gateway>) { }

    async findAll(query) {
        const { page = 1, limit = 10 } = query;
        const where = {};
        const skip = (+page - 1) * +limit;
        const sort = { createdAt: 'desc' };

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

        const items = await this.gatewayModel.find()
            .where(where)
            .skip(skip)
            .limit(+limit)
            .sort(sort)
            .populate({ path: 'devices', model: 'Device' })
            .exec();

        const total = await this.gatewayModel.countDocuments();

        return { 
            items,
            hasPreviousPage: skip > 0 && items.length > 0 ? true : false,
            hasNextPage: (+limit + skip) < total ? true : false,
            total
        };
    }


    async findOne(options: object): Promise<Gateway> {
        const gateway = await this.gatewayModel.findOne(options).populate({ path: 'devices', model: 'Device' }).exec();

        if (!gateway) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Gateway not found',
              }, HttpStatus.NOT_FOUND);
        }
        
        return gateway
    }

    async findById(ID: number): Promise<Gateway> {
        const gateway = await this.gatewayModel.findById(ID).populate({ path: 'devices', model: 'Device' }).exec();

        if (!gateway) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Gateway not found',
              }, HttpStatus.NOT_FOUND);
        }

        return gateway
    }

    async create(createGatewayDto: CreateGatewayDto): Promise<Gateway> {
        const gateway = await this.gatewayModel.findOne({ serial: createGatewayDto.serial}).exec();

        if (gateway) {
            throw new HttpException({
                status: HttpStatus.OK,
                error: 'Serial Number must be unique',
              }, HttpStatus.OK);
        }

        const createdGateway = new this.gatewayModel(createGatewayDto);
        return createdGateway.save();
    }

    async update(ID: number, newValue: Gateway): Promise<Gateway> {
        const gateway = await this.gatewayModel.findById(ID).exec();

        if (!gateway) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Gateway not found',
              }, HttpStatus.NOT_FOUND);
        }

        await this.gatewayModel.findByIdAndUpdate(ID, newValue).exec();
        return await this.gatewayModel.findById(ID).exec();
    }

    async delete(ID: number): Promise<Gateway> {
        return await this.gatewayModel.findByIdAndRemove(ID).exec();
    }
}
