import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { DeviceStatus } from "../enum/device.enum";

export class CreateDeviceDto {
  @ApiProperty({
    required: true,
    example: '5f98edf39be45f10cc5a769b',
    description: 'The id of the Gateway',
  })
  @IsNotEmpty()
  readonly idGateway: number;

  @ApiProperty({
    required: true,
    example: 'b4hs6',
    description: 'The uid of the Device',
  })
  @IsNotEmpty()
  readonly uid: number;

  @ApiProperty({
    required: true,
    example: 'Vendor 1',
    description: 'The vendor of the Device',
  })
  @IsNotEmpty()
  @IsString()
  readonly vendor: string;

  @ApiProperty({ 
    required: true,
    enum: DeviceStatus, 
    enumName: 'Status',
    description: 'The status of the Device',
})
  @IsEnum(DeviceStatus)
  readonly status:  DeviceStatus;
}
