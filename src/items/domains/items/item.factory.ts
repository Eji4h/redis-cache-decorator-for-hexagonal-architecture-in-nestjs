import { Builder } from 'builder-pattern';

import { ItemAttributes } from './item.attribute';
import { IItem, Item } from './item.entity';
import { ItemStatus } from './itemStatus.enum';

export interface ItemToCreate extends Omit<ItemAttributes, 'id' | 'status'> {
  status?: ItemStatus;
}

export class ItemFactory {
  static create({
    name,
    price,
    imageUrl,
    status,
    color,
    country,
    category,
  }: ItemToCreate): IItem {
    const item = Builder(Item)
      .name(name)
      .price(price)
      .imageUrl(imageUrl)
      .status(status ?? ItemStatus.Available)
      .color(color)
      .country(country)
      .category(category)
      .build();
    return item;
  }
}
