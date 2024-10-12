import { IItem, ItemAttributes, ItemId } from '../../domains';

export const ItemsRepositoryToken = Symbol('ItemsRepositoryToken');

export interface FindAllQuery {
  available?: boolean;
}

export interface ItemsRepository {
  create(item: Omit<ItemAttributes, 'itemId'>): Promise<IItem>;
  findAll(query: FindAllQuery): Promise<IItem[]>;
  findById(itemId: ItemId): Promise<IItem | undefined>;
  update(itemToUpdate: IItem): Promise<IItem>;
  delete(itemId: ItemId): Promise<void>;
}
