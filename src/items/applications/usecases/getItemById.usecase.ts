import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ItemsRepository, ItemsRepositoryToken } from '../ports';
import { IItem, ItemId } from '../../domains';
import { isUndefined } from 'lodash';

@Injectable()
export class GetItemByIdUseCase {
  constructor(
    @Inject(ItemsRepositoryToken)
    private readonly itemRepository: ItemsRepository,
  ) {}

  async execute(itemId: ItemId): Promise<IItem> {
    const item = await this.itemRepository.findById(itemId);

    const isItemFound = !isUndefined(item);
    if (!isItemFound) {
      throw new NotFoundException();
    }

    return item;
  }
}
