import { Injectable, Inject } from '@nestjs/common';
import {
  ItemsRepository,
  ItemsRepositoryToken,
} from '../ports/items.repository';
import { IItem, ItemColor } from '../../domains';

import { ItemStatus } from '../../domains';

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
    return this.itemRepository.findAll(query);
  }
}
