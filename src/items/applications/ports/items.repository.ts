import { IItem, ItemAttributes, ItemId } from '../../domains';

export const ItemsRepositoryToken = Symbol('ItemsRepositoryToken');

export interface ItemsRepository {
  create(item: Omit<ItemAttributes, 'itemId'>): Promise<IItem>;
  findAll(): Promise<IItem[]>;
  findById(itemId: ItemId): Promise<IItem | undefined>;
  update(itemToUpdate: IItem): Promise<IItem>;
  delete(itemId: ItemId): Promise<void>;
}
