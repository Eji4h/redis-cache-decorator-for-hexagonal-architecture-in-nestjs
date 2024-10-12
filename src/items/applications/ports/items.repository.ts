import { IItem, ItemAttributes, ItemId } from '../../domains';

export const ItemsRepositoryToken = Symbol('ItemsRepositoryToken');

export interface FindAllQuery {
  available?: boolean;
}

export interface ItemsRepository {
  findById(itemId: ItemId): Promise<IItem | undefined>;
}
