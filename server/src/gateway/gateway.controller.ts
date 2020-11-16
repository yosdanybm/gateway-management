import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Query, Request, Response, UseFilters } from '@nestjs/common'

import { GatewayService } from './gateway.service'
import { CreateGatewayDto } from './dto/create-gateway.dto'
import { Gateway } from './schemas/gateway.schema'
import { ApiForbiddenResponse, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Gateways')
@Controller('gateway')
export class GatewayController {
    constructor(private readonly gatewayService: GatewayService) { }

    @ApiOperation({ summary: 'Retrieve all Gateways' })
    @ApiResponse({
		status: 200,
        description: 'Get all Gateways data',
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
    public async findAll(@Query() query, @Response() res): Promise<Gateway[]> {
        const gateways = await this.gatewayService.findAll(query);
        return res.status(HttpStatus.OK).json(gateways);
    }


    @ApiOperation({ summary: 'Find gateway by query' })
    @ApiResponse({
		status: 200,
		description: 'The found gateway',
		type: Gateway
    })
    @ApiNotFoundResponse({
		description: 'Gateway not found',
	})
    @Get('find')
    public async findTodo(@Response() res, @Body() body) {
        const queryCondition = body;
        const gateways = await this.gatewayService.findOne(queryCondition);
        return res.status(HttpStatus.OK).json(gateways);
    }

    @ApiOperation({ summary: 'Find gateway by id' })
    @ApiResponse({
		status: 200,
		description: 'The found gateway',
		type: Gateway
    })
    @ApiNotFoundResponse({
		description: 'Gateway not found',
	})
    @Get('/:id')
    public async getTodo(@Response() res, @Param() param) {
        const gateways = await this.gatewayService.findById(param.id);
        return res.status(HttpStatus.OK).json(gateways);
    }

    // @UseFilters(MongooseExceptionFilter)
    @ApiOperation({ summary: 'Create gateway' })
    @ApiResponse({
		status: 200,
		description: 'Gateway created',
		type: Gateway
	})
    @Post()
    public async create(@Response() res, @Body() createGatewayDto: CreateGatewayDto) {
        const gateways = await this.gatewayService.create(createGatewayDto);
        return res.status(HttpStatus.OK).json(gateways);
    }

    @ApiOperation({ summary: 'Update gateway' })
    @ApiResponse({
		status: 200,
		description: 'Gateway updated',
		type: Gateway
    })
    @ApiNotFoundResponse({
		description: 'Gateway not found',
	})
    @Patch('/:id')
    public async updateGateway(@Param() param, @Response() res, @Body() body) {
        const gateway = await this.gatewayService.update(param.id, body);
        return res.status(HttpStatus.OK).json(gateway);
    }

    @ApiOperation({ summary: 'Delete gateway' })
    @ApiResponse({
		status: 200,
		description: 'Gateway deleted',
		type: Gateway
    })
    @ApiNotFoundResponse({
		description: 'Gateway not found',
    })
    @Delete('/:id')
    public async deleteGateway(@Param() param, @Response() res) {
        const gateway = await this.gatewayService.delete(param.id);

        if (!gateway) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Gateway not found',
              }, HttpStatus.NOT_FOUND);
        }

        return res.status(HttpStatus.OK).json(gateway);
    }
}
