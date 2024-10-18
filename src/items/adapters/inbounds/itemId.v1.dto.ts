import { IsMongoId } from 'class-validator';
import { ItemId } from '../../domains';

export class ItemIdV1Dto {
  @IsMongoId()
  itemId: ItemId;
}
