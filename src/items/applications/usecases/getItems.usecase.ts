import { Injectable } from '@nestjs/common';
import { ItemsRepository } from '../ports/items.repository';
import { IItem } from '../../domains';

export interface GetItemsQuery {
  available?: boolean;
}

@Injectable()
export class GetItemsUseCase {
  constructor(private readonly itemRepository: ItemsRepository) {}

  async execute(query: GetItemsQuery): Promise<IItem[]> {
    return this.itemRepository.findAll(query);
  }
}
