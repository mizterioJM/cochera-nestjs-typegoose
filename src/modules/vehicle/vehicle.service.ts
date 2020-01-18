import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ModelType } from 'typegoose';
import { plainToClass } from 'class-transformer';
import { InjectModel } from '@nestjs/mongoose';
import { Vehicle } from './models/vehicle.model';
import {
  CreateVehicleDTO,
  UpdateVehicleDTO,
  ReadVehicleVM,
} from './models/view-model';
import { VehicleStatus } from './models/vehicle.enum';

@Injectable()
export class VehicleService {
  constructor(
    @InjectModel(Vehicle.modelName)
    private readonly _vehicleModule: ModelType<Vehicle>,
  ) {}

  async get(placa: string): Promise<ReadVehicleVM> {
    if (!placa) {
      throw new BadRequestException('Placa requerida');
    }

    const vehicle = await this._vehicleModule.findOne({ placa });

    if (!vehicle) {
      throw new NotFoundException('No existe');
    }

    return plainToClass(ReadVehicleVM, vehicle);
  }

  async getAll(): Promise<ReadVehicleVM[]> {
    const vehicles: Vehicle[] = await this._vehicleModule
      .find()
      .sort({ status: 1 });

    return vehicles.map((vehicle: Vehicle) =>
      plainToClass(ReadVehicleVM, vehicle),
    );
  }

  async create(vehicle: CreateVehicleDTO): Promise<ReadVehicleVM> {
    const { placa } = vehicle;

    const foundVehicle = await this._vehicleModule.findOne({ placa });

    if (foundVehicle) {
      throw new BadRequestException('Ya existe');
    }

    const newVehicle: Vehicle = await this._vehicleModule.create(vehicle);

    return plainToClass(ReadVehicleVM, newVehicle);
  }

  async update(
    placa: string,
    vehicle: Partial<UpdateVehicleDTO>,
  ): Promise<boolean> {
    const foundVehicle = await this._vehicleModule.findOne({ placa });

    if (!foundVehicle) {
      throw new NotFoundException('Vehicle no existe');
    }

    foundVehicle.placa = vehicle.placa;
    foundVehicle.driver = vehicle.driver;
    foundVehicle.status = vehicle.status;

    const updateVehicle = await this._vehicleModule.update(
      { placa },
      foundVehicle,
    );

    return updateVehicle.ok ? true : false;
  }

  async delete(placa: string): Promise<boolean> {
    const foundVehicle = await this._vehicleModule.findOne({ placa });

    if (!foundVehicle) {
      throw new NotFoundException('Placa no existe');
    }

    if (foundVehicle.status === VehicleStatus.INACTIVE) {
      const deleteV = await this._vehicleModule.deleteOne({ placa });

      return deleteV.ok ? true : false;
    }

    foundVehicle.status = VehicleStatus.INACTIVE;

    const deleteVehicle = await this._vehicleModule.update(
      { placa },
      foundVehicle,
    );

    return deleteVehicle.ok ? true : false;
  }
}
