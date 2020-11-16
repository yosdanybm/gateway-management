import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsIP, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateGatewayDto {
  @ApiProperty({
    required: true,
    example: 'adf8oc896',
    description: 'The serial of the Gateway',
  })
  @IsNotEmpty()
  readonly serial: string;

  @ApiProperty({
    required: true,
    example: 'Gateway 1',
    description: 'The name of the Gateway',
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    required: true,
    example: '192.168.2.2',
    description: 'The address of the Gateway',
  })
  @IsIP("4")
  @IsNotEmpty()
  readonly address: string;

  @IsOptional()
  @IsArray()
  readonly devices: string[];
}
