import { ItemColor } from './itemColor.enum';
import { ItemId } from './itemId';
import { ItemStatus } from './itemStatus.enum';

export interface IItem {
  id: ItemId;
  name: string;
  price: number;
  imageUrl: string;
  status: ItemStatus;
  color: ItemColor;

  changeName(name: string): this;
  changePrice(price: number): this;
  changeImageUrl(imageUrl: string): this;
  changeColor(color: ItemColor): this;
  changeStatus(status: ItemStatus): this;
  obsoleted(): this;
}

export class Item implements IItem {
  id: ItemId;
  name: string;
  price: number;
  imageUrl: string;
  status: ItemStatus;
  color: ItemColor;

  changeName(name: string): this {
    this.name = name;
    return this;
  }

  changePrice(price: number): this {
    this.price = price;
    return this;
  }

  changeImageUrl(imageUrl: string): this {
    this.imageUrl = imageUrl;
    return this;
  }

  changeColor(color: ItemColor): this {
    this.color = color;
    return this;
  }

  changeStatus(status: Exclude<ItemStatus, ItemStatus.Obsoleted>): this {
    this.status = status;
    return this;
  }

  obsoleted(): this {
    this.status = ItemStatus.Obsoleted;
    return this;
  }
}
