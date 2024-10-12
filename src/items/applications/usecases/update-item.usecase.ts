import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ItemRepository, ItemRepositoryToken } from '../ports';
import { IItem } from '../../domains';
import { UpdateItemCommand } from '../commands';
import { isUndefined } from 'lodash';

@Injectable()
export class UpdateItemUsecase {
  constructor(
    @Inject(ItemRepositoryToken)
    private readonly itemRepository: ItemRepository,
  ) {}

  async execute(command: UpdateItemCommand): Promise<IItem> {
    const item = await this.itemRepository.findById(command.itemId);

    const isItemFound = !isUndefined(item);
    if (!isItemFound) {
      throw new NotFoundException();
    }

    const isWantToChangeName = !isUndefined(command.name);
    if (isWantToChangeName) {
      item.changeName(command.name);
    }

    const isWantToChangePrice = !isUndefined(command.price);
    if (isWantToChangePrice) {
      item.changePrice(command.price);
    }

    const isWantToChangeImageUrl = !isUndefined(command.imageUrl);
    if (isWantToChangeImageUrl) {
      item.changeImageUrl(command.imageUrl);
    }

    const isWantToChangeAvailableStatus = !isUndefined(command.available);
    if (isWantToChangeAvailableStatus) {
      item.changeAvailableStatus(command.available);
    }

    return this.itemRepository.update(item);
  }
}
