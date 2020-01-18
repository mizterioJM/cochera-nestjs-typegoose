import { IsString, MaxLength } from 'class-validator';

export class CreateVehicleDTO {
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
}
