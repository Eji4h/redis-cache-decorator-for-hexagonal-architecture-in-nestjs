import { IItem, ItemId } from '../../domains';

export const ItemRepositoryToken = Symbol('ItemRepositoryToken');

export interface ItemRepository {
  create(item: IItem): Promise<IItem>;
  findAll(): Promise<IItem[]>;
  findById(itemId: ItemId): Promise<IItem | undefined>;
  update(itemToUpdate: IItem): Promise<IItem>;
}
