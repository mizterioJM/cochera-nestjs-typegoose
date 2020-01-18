import { BaseModel, schemaOptions } from '../../../shared/base.model';
import { VehicleStatus } from './vehicle.enum';
import { ModelType, prop } from 'typegoose';
import { Schema } from 'mongoose';

export class Vehicle extends BaseModel<Vehicle> {
  @prop({
    required: [true, 'Placa requerida'],
    unique: true,
  })
  placa: string;

  @prop({
    required: [true, 'placa requerida'],
  })
  driver: string;

  @prop({
    enum: VehicleStatus,
    default: VehicleStatus.ACTIVE,
  })
  status: VehicleStatus;

  static get model(): ModelType<Vehicle> {
    return new Vehicle().getModelForClass(Vehicle, { schemaOptions });
  }

  static get modelName(): string {
    return this.model.modelName;
  }

  static get schema(): Schema {
    return this.model.schema;
  }
}
