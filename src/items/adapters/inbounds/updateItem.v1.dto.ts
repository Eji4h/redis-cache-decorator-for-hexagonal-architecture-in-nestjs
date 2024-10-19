import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

import { UpdateItemCommand } from '../../applications/usecases';
import { ItemStatus } from '../../domains';

export class UpdateItemV1Dto implements Omit<UpdateItemCommand, 'id'> {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  price?: number;

  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @IsIn([ItemStatus.Available, ItemStatus.Unavailable])
  @IsOptional()
  status?: ItemStatus.Available | ItemStatus.Unavailable;
}
