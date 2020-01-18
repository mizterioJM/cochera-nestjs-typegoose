import { VehicleStatus } from '../vehicle.enum';
import { IsString, IsEnum, IsDate } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ReadVehicleVM {
  @IsString()
  @Expose()
  readonly placa: string;

  @IsString()
  @Expose()
  readonly driver: string;

  @IsEnum(VehicleStatus)
  @Expose()
  readonly status: VehicleStatus;

  @IsString()
  @Expose()
  readonly _id: string;
}
