import { Injectable, Inject } from '@nestjs/common';
import {
  ItemsRepository,
  ItemsRepositoryToken,
} from '../ports/items.repository';
import { IItem, ItemColor, ItemStatus } from '../../domains';

export interface GetItemsQuery {
  status?: ItemStatus;
  color?: ItemColor;
}

@Injectable()
export class GetItemsUseCase {
  constructor(
    @Inject(ItemsRepositoryToken)
    private readonly itemRepository: ItemsRepository,
  ) {}

  async execute(query: GetItemsQuery): Promise<IItem[]> {
    const isHaveQuery = !!query.status || !!query.color;
    if (isHaveQuery) {
      return this.itemRepository.findByStatusAndColor(
        query.status,
        query.color,
      );
    }

    return this.itemRepository.findAll();
  }
}
