import { IsEnum, IsOptional } from 'class-validator';

import { ItemColor, ItemStatus } from '../../domains';

export class GetItemsV1Dto {
  @IsOptional()
  @IsEnum(ItemStatus)
  status?: ItemStatus;

  @IsOptional()
  @IsEnum(ItemColor)
  color?: ItemColor;
}
