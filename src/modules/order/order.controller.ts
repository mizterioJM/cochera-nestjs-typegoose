import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import {
  ReadOrderDto,
  CreateOrderDto,
  UpdateOrderDto,
} from './models/view-models';

@Controller('order')
export class OrderController {
  constructor(private readonly _orderService: OrderService) {}

  @Get(':vehiclePlaca')
  getAllByVehicle(
    @Param('vehiclePlaca') vehiclePlaca: string,
  ): Promise<ReadOrderDto[]> {
    return this._orderService.getAllByVehicle(vehiclePlaca);
  }

  @Get()
  getAll(): Promise<ReadOrderDto[]> {
    return this._orderService.getAll();
  }

  @Post()
  create(@Body() order: CreateOrderDto): Promise<ReadOrderDto> {
    return this._orderService.create(order);
  }

  @Put(':orderId')
  update(
    @Param('orderId') orderId: string,
    @Body() order: UpdateOrderDto,
  ): Promise<ReadOrderDto> {
    return this._orderService.update(orderId, order);
  }

  @Delete(':orderId')
  delete(@Param('orderId') orderId: string): Promise<boolean> {
    return this._orderService.delete(orderId);
  }
}
