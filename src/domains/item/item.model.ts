import { ItemId } from './item-id';

export interface IItem {
  itemId: ItemId;
  name: string;
  price: number;
  imageUrl: string;
  available: boolean;

  changeName(name: string): this;
  changePrice(price: number): this;
  changeImageUrl(imageUrl: string): this;
  changeAvailableStatus(available: boolean): this;
}

export class Item implements IItem {
  itemId: ItemId;
  name: string;
  price: number;
  imageUrl: string;
  available: boolean;

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

  changeAvailableStatus(available: boolean): this {
    this.available = available;

    return this;
  }
}
