import { IItem, ItemId, ItemColor, ItemStatus } from '../../domains';

export const ItemsRepositoryToken = Symbol('ItemsRepositoryToken').toString();

export interface FindAllQuery {
  status?: ItemStatus;
  color?: ItemColor;
}

export interface ItemsRepository {
  create(item: IItem): Promise<IItem>;
  findByStatusAndColor(
    status: ItemStatus | undefined,
    color: ItemColor | undefined,
  ): Promise<IItem[]>;
  findById(itemId: ItemId): Promise<IItem | undefined>;
  update(itemToUpdate: IItem): Promise<IItem>;
  delete(itemId: ItemId): Promise<void>;
}
