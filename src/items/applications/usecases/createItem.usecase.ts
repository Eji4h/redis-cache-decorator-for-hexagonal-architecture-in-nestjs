import { Inject, Injectable } from '@nestjs/common';
import { ItemsRepository, ItemsRepositoryToken } from '../ports';
import { IItem, ItemAttributes } from '../../domains';
import { CreateItemCommand } from '../commands';
import { Builder } from 'builder-pattern';

@Injectable()
export class CreateItemUseCase {
  constructor(
    @Inject(ItemsRepositoryToken)
    private readonly itemRepository: ItemsRepository,
  ) {}

  async execute(command: CreateItemCommand): Promise<IItem> {
    const itemToCreate = Builder<ItemAttributes>()
      .name(command.name)
      .price(command.price)
      .imageUrl(command.imageUrl)
      .available(command.available ?? true)
      .build();

    return this.itemRepository.create(itemToCreate);
  }
}
