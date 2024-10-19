import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { IItem, ItemId, ItemStatus } from '../../domains';
import { ItemAttributes } from '../../domains';
import { ItemsRepository, ItemsRepositoryToken } from '../ports';

export interface UpdateItemCommand
  extends Partial<Omit<ItemAttributes, 'color'>> {
  id: ItemId;
  status?: Exclude<ItemStatus, ItemStatus.Obsoleted>;
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

    return this.itemRepository.update(item);
  }
}
