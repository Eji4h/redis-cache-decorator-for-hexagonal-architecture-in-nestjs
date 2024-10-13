import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ItemsRepository, ItemsRepositoryToken } from '../ports';
import { IItem } from '../../domains';

import { ItemAttributes, ItemId } from '../../domains';

export interface UpdateItemCommand extends Partial<ItemAttributes> {
  id: ItemId;
}

@Injectable()
export class UpdateItemUseCase {
  constructor(
    @Inject(ItemsRepositoryToken)
    private readonly itemRepository: ItemsRepository,
  ) {}

  async execute(command: UpdateItemCommand): Promise<IItem> {
    const item = await this.itemRepository.findById(command.id);

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

    const isWantToChangeStatus = command.status !== undefined;
    if (isWantToChangeStatus) {
      item.changeStatus(command.status);
    }

    const isWantToChangeColor = command.color !== undefined;
    if (isWantToChangeColor) {
      item.changeColor(command.color);
    }

    return this.itemRepository.update(item);
  }
}
