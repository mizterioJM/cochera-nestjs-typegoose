import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './models/order.model';
import { ModelType } from 'typegoose';
import {
  CreateOrderDto,
  UpdateOrderDto,
  ReadOrderDto,
} from './models/view-models';
import { plainToClass } from 'class-transformer';
import { Types } from 'mongoose';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.modelName)
    private readonly _orderModel: ModelType<Order>,
  ) {}

  async get(orderId: string): Promise<ReadOrderDto> {
    if (!orderId) {
      throw new BadRequestException('Id requerida');
    }

    const foundOrder = await this._orderModel
      .findById(orderId)
      .populate('vehicle');

    if (!foundOrder) {
      throw new NotFoundException('Registro no existente');
    }

    return plainToClass(ReadOrderDto, foundOrder);
  }

  async getAllByVehicle(vehiclePlaca: string): Promise<ReadOrderDto[]> {
    const orders: Order[] = await this._orderModel
      .find({ vehicle: vehiclePlaca })
      .populate('vehicle');
    return orders.map((order: Order) => plainToClass(ReadOrderDto, order));
  }

  async getAll(): Promise<ReadOrderDto[]> {
    const orders: Order[] = await this._orderModel.find().populate('vehicle');

    return orders.map((order: Order) => plainToClass(ReadOrderDto, order));
  }

  async create(order: Partial<CreateOrderDto>): Promise<ReadOrderDto> {
    const { vehicle } = order;

    if (!vehicle) {
      throw new BadRequestException('ID vehiculo requerido');
    }

    const createOrder = await this._orderModel.create(order);

    return plainToClass(ReadOrderDto, createOrder);
  }

  async update(
    orderId: string,
    order: Partial<UpdateOrderDto>,
  ): Promise<ReadOrderDto> {
    if (!orderId) {
      throw new BadRequestException('ID requerido');
    }

    const foundOrder = await this._orderModel.findById(
      this.toObjectId(orderId),
    );

    foundOrder.payed = order.payed;
    foundOrder.amount = order.amount;

    const updateOrder = await this._orderModel.findByIdAndUpdate(
      this.toObjectId(orderId),
      foundOrder,
    );

    return plainToClass(ReadOrderDto, updateOrder);
  }

  async delete(orderId: string): Promise<boolean> {
    const deleteOrder = await this._orderModel.findByIdAndRemove(
      this.toObjectId(orderId),
    );

    if (!deleteOrder) {
      throw new InternalServerErrorException();
    }
    return deleteOrder ? true : false;
  }

  private toObjectId(id: string): Types.ObjectId {
    return Types.ObjectId(id);
  }
}
