import { IsBoolean, IsNumber } from 'class-validator';

export class UpdateOrderDto {
  @IsBoolean()
  readonly payed: boolean;

  @IsNumber()
  readonly amount: number;
}
