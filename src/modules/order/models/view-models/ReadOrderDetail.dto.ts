import { IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ReadOrderDetailDto {
  @IsString()
  @Expose()
  readonly _id: string;

  @IsString()
  @Expose()
  readonly placa: string;
}
