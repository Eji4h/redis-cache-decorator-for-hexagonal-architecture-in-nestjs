import { Builder } from 'builder-pattern';
import { ItemAttributes } from './item.attribute';
import { IItem, Item } from './item.model';
import { ItemStatus } from './itemStatus.enum';

export type ItemToCreate = Omit<ItemAttributes, 'id'>;

export class ItemFactory {
  static create({ name, price, imageUrl, status, color }: ItemToCreate): IItem {
    const item = Builder(Item)
      .name(name)
      .price(price)
      .imageUrl(imageUrl)
      .status(status ?? ItemStatus.Available)
      .color(color)
      .build();
    return item;
  }
}
