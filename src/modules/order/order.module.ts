import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order } from './models/order.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Order.modelName,
        schema: Order.schema,
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
