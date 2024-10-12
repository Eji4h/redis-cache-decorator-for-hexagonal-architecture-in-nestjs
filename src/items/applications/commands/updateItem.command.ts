import { ItemAttributes, ItemId } from '../../domains';

export interface UpdateItemCommand extends Partial<ItemAttributes> {
  itemId: ItemId;
}
