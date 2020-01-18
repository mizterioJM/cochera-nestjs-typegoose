import { Typegoose, prop } from 'typegoose';
import { SchemaOptions } from 'mongoose';
import { Expose } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';

export class BaseModelVm {
  @IsDate()
  @Expose()
  readonly createdAt?: Date;

  @IsDate()
  readonly updatedAt?: Date;

  @IsString()
  @Expose()
  readonly _id: string;
}

export class BaseModel<T> extends Typegoose {
  @prop()
  createdAt: Date;

  @prop()
  updatedAt: Date;

  @prop()
  id: string;
}

export const schemaOptions: SchemaOptions = {
  timestamps: true,
};
