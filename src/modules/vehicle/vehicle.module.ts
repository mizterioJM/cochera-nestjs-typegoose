import { Module } from '@nestjs/common';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Vehicle } from './models/vehicle.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Vehicle.modelName,
        schema: Vehicle.schema,
      },
    ]),
  ],
  controllers: [VehicleController],
  providers: [VehicleService],
})
export class VehicleModule {}
