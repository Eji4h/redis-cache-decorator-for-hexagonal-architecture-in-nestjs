import { Inject, Injectable } from '@nestjs/common';
import { ItemsRepository, ItemsRepositoryToken } from '../ports';
import { IItem, ItemAttributes } from '../../domains';
import { Builder } from 'builder-pattern';

export type CreateItemCommand = Omit<ItemAttributes, 'itemId' | 'available'> &
  Partial<Pick<ItemAttributes, 'available'>>;

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
