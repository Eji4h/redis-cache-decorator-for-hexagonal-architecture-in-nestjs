import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { ItemColor, ItemStatus } from 'src/items/domains';

import { CreateItemCommand } from '../../applications/usecases';

export class CreateItemV1Dto implements CreateItemCommand {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  price: number;

  @IsUrl()
  @IsNotEmpty()
  imageUrl: string;

  @IsEnum(ItemStatus)
  @IsOptional()
  status?: ItemStatus;

  @IsEnum(ItemColor)
  color: ItemColor;
}
