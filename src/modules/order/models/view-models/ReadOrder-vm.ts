import { Type, Exclude, Expose } from 'class-transformer';
import { BaseModelVm } from '../../../../shared/base.model';
import { IsBoolean, IsNumber } from 'class-validator';
import { ReadOrderDetailDto } from './ReadOrderDetail.dto';

@Exclude()
export class ReadOrderDto extends BaseModelVm {
  @Type(type => ReadOrderDetailDto)
  @Expose()
  readonly vehicle: ReadOrderDetailDto;

  @IsBoolean()
  @Expose()
  readonly payed: boolean;

  @IsNumber()
  @Expose()
  readonly amount: number;
}
