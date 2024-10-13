import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { UpdateItemCommand } from '../../applications/usecases';
import { ItemStatus, ItemColor } from '../../domains';

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

  @IsEnum(ItemStatus)
  @IsOptional()
  status?: ItemStatus;

  @IsEnum(ItemColor)
  @IsOptional()
  color?: ItemColor;
}
