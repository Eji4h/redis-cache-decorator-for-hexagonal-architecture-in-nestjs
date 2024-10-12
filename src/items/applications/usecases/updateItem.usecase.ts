import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ItemsRepository, ItemsRepositoryToken } from '../ports';
import { IItem } from '../../domains';

import { ItemAttributes, ItemId } from '../../domains';

export interface UpdateItemCommand extends Partial<ItemAttributes> {
  itemId: ItemId;
}

@Injectable()
export class UpdateItemUseCase {
  constructor(
    @Inject(ItemsRepositoryToken)
    private readonly itemRepository: ItemsRepository,
  ) {}

  async execute(command: UpdateItemCommand): Promise<IItem> {
    const item = await this.itemRepository.findById(command.itemId);

    const isItemFound = item !== undefined;
    if (!isItemFound) {
      throw new NotFoundException();
    }

    const isWantToChangeName = command.name !== undefined;
    if (isWantToChangeName) {
      item.changeName(command.name);
    }

    const isWantToChangePrice = command.price !== undefined;
    if (isWantToChangePrice) {
      item.changePrice(command.price);
    }

    const isWantToChangeImageUrl = command.imageUrl !== undefined;
    if (isWantToChangeImageUrl) {
      item.changeImageUrl(command.imageUrl);
    }

    const isWantToChangeAvailableStatus = command.available !== undefined;
    if (isWantToChangeAvailableStatus) {
      item.changeAvailableStatus(command.available);
    }

    return this.itemRepository.update(item);
  }
}
