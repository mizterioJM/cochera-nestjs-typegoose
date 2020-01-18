import { BaseModel, schemaOptions } from '../../../shared/base.model';
import { Vehicle } from '../../vehicle/models/vehicle.model';
import { Ref, prop, ModelType } from 'typegoose';
import { IsBoolean, IsNumber } from 'class-validator';
import { Schema } from 'mongoose';

export class Order extends BaseModel<Order> {
  @prop({ ref: Vehicle })
  vehicle: Ref<Vehicle>;

  @prop({ default: false })
  @IsBoolean()
  payed: boolean;

  @prop({ default: 0.0 })
  @IsNumber()
  amount: number;

  static get model(): ModelType<Order> {
    return new Order().getModelForClass(Order, { schemaOptions });
  }

  static get modelName(): string {
    return this.model.modelName;
  }

  static get schema(): Schema {
    return this.model.schema;
  }
}
