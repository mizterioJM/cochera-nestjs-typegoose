import { IsString, MaxLength, IsEnum } from 'class-validator';
import { VehicleStatus } from '../vehicle.enum';

export class UpdateVehicleDTO {
  @IsString()
  @MaxLength(10, {
    message: 'Esta placa es invalidad',
  })
  readonly placa: string;

  @IsString()
  @MaxLength(50, {
    message: 'Nombre muy largo',
  })
  readonly driver: string;

  @IsEnum(VehicleStatus)
  readonly status: VehicleStatus;
}
