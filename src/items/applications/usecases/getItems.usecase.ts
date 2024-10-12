import { Injectable, Inject } from '@nestjs/common';
import {
  ItemsRepository,
  ItemsRepositoryToken,
} from '../ports/items.repository';
import { IItem } from '../../domains';

export interface GetItemsQuery {
  available?: boolean;
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
