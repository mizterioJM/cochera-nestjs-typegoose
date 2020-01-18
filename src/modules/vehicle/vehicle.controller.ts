import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Body,
  Delete,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import {
  ReadVehicleVM,
  CreateVehicleDTO,
  UpdateVehicleDTO,
} from './models/view-model';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly _vehicleService: VehicleService) {}

  @Get(':placaVehicle')
  get(@Param('placaVehicle') placaVehicle: string): Promise<ReadVehicleVM> {
    return this._vehicleService.get(placaVehicle);
  }

  @Get()
  getAll(): Promise<ReadVehicleVM[]> {
    return this._vehicleService.getAll();
  }

  @Post()
  create(@Body() vehicle: CreateVehicleDTO): Promise<ReadVehicleVM> {
    return this._vehicleService.create(vehicle);
  }

  @Put(':placaVehicle')
  update(
    @Param('placaVehicle') placaVehicle: string,
    @Body() vehicle: Partial<UpdateVehicleDTO>,
  ): Promise<boolean> {
    return this._vehicleService.update(placaVehicle, vehicle);
  }

  @Delete(':placaVehicle')
  delete(@Param('placaVehicle') placaVehicle: string): Promise<boolean> {
    return this._vehicleService.delete(placaVehicle);
  }
}
