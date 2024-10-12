import { IItem, ItemId } from '../../domains';

export const ItemsRepositoryToken = Symbol('ItemsRepositoryToken');

export interface ItemsRepository {
  create(item: IItem): Promise<IItem>;
  findAll(): Promise<IItem[]>;
  findById(itemId: ItemId): Promise<IItem | undefined>;
  update(itemToUpdate: IItem): Promise<IItem>;
}
