import { IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';
import { ReadOrderDetailDto } from './ReadOrderDetail.dto';

export class CreateOrderDto {
  @IsNotEmpty()
  readonly vehicle: ReadOrderDetailDto;

  @IsBoolean()
  readonly payed: boolean;

  @IsNumber()
  readonly amount: number;
}
