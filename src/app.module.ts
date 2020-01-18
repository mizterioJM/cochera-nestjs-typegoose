import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { ConfigService } from './config/config.service';
import { Configuration } from './config/config.enum';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [ConfigModule, DatabaseModule, VehicleModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: string | number;

  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Configuration.PORT);
  }
}
