import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { IItem, ItemId } from '../../domains';
import { ItemsRepository, ItemsRepositoryToken } from '../ports';

@Injectable()
export class GetItemByIdUseCase {
  constructor(
    @Inject(ItemsRepositoryToken)
    private readonly itemRepository: ItemsRepository,
  ) {}

  async execute(itemId: ItemId): Promise<IItem> {
    const item = await this.itemRepository.findById(itemId);

    const isItemFound = item !== undefined;
    if (!isItemFound) {
      throw new NotFoundException();
    }

    return item;
  }
}
