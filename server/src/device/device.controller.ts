import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Query, Request, Response, UseFilters } from '@nestjs/common'
import { ApiForbiddenResponse, ApiOperation, ApiResponse, ApiTags, ApiNotFoundResponse, ApiBadGatewayResponse } from '@nestjs/swagger';

import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { Device } from './schemas/device.schema';

@ApiTags('Device')
@Controller('device')
export class DeviceController {
    constructor(private readonly deviceService: DeviceService) { }

    @ApiOperation({ summary: 'Retrieve all Devices' })
    @ApiResponse({
		  status: 200,
        description: 'Get all Devices data',
        schema: {
            properties: {
              items: {
                type: "array",
              },
              hasPreviousPage: {
                type: "boolean"
              },
              hasNextPage: {
                type: "boolean"
              },
              total: {
                type: "number"
              },
            }
        }
    })
    @ApiForbiddenResponse({
		  description: 'The page must be greater than 0 or The limit must be greater than 0',
    })
    @Get('findAll')
    public async findAll(@Query() query, @Response() res): Promise<Device[]> {
        const gateways = await this.deviceService.findAll(query);
        return res.status(HttpStatus.OK).json(gateways);
    }

    @ApiOperation({ summary: 'Find device by query' })
    @ApiResponse({
      status: 200,
      description: 'The found device',
      type: Device
    })
    @ApiNotFoundResponse({
      description: 'Device not found',
    })
    @Get('find')
    public async findTodo(@Response() res, @Body() body) {
        const queryCondition = body;
        const gateways = await this.deviceService.findOne(queryCondition);
        return res.status(HttpStatus.OK).json(gateways);
    }

    @ApiOperation({ summary: 'Find device by id' })
    @ApiResponse({
      status: 200,
      description: 'The found device',
      type: Device
    })
    @ApiNotFoundResponse({
      description: 'Device not found',
    })
    @Get('/:id')
    public async getTodo(@Response() res, @Param() param) {
        const gateways = await this.deviceService.findById(param.id);
        return res.status(HttpStatus.OK).json(gateways);
    }

    @ApiOperation({ summary: 'Create device' })
    @ApiResponse({
      status: 200,
      description: 'Device created',
      type: Device
    })
    @ApiBadGatewayResponse({
      description: 'They are not allowed more than 10 devices per gateway',
    })
    @Post()
    public async create(@Response() res, @Body() createGatewayDto: CreateDeviceDto) {
        const gateways = await this.deviceService.create(createGatewayDto);
        return res.status(HttpStatus.OK).json(gateways);
    }

    @ApiOperation({ summary: 'Update device' })
    @ApiResponse({
      status: 200,
      description: 'Device updated',
      type: Device
    })
    @ApiNotFoundResponse({
      description: 'Device not found',
    })
    @Patch('/:id')
    public async updateGateway(@Param() param, @Response() res, @Body() body) {
        const device = await this.deviceService.update(param.id, body);
        return res.status(HttpStatus.OK).json(device);
    }

    @ApiOperation({ summary: 'Delete device' })
    @ApiResponse({
      status: 200,
      description: 'Device deleted',
      type: Device
    })
    @ApiNotFoundResponse({
		  description: 'Device not found',
    })
    @Delete('/:id')
    public async deleteGateway(@Param() param, @Response() res) {
        const device = await this.deviceService.delete(param.id);

        if (!device) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Device not found',
              }, HttpStatus.NOT_FOUND);
        }

        return res.status(HttpStatus.OK).json(device);
    }
}
