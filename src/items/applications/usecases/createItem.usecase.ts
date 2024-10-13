import { Inject, Injectable } from '@nestjs/common';
import { ItemsRepository, ItemsRepositoryToken } from '../ports';
import { IItem, ItemAttributes, ItemStatus } from '../../domains';
import { Builder } from 'builder-pattern';

export type CreateItemCommand = Omit<ItemAttributes, 'id' | 'status'> &
  Partial<Pick<ItemAttributes, 'status'>>;

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
      .status(command.status ?? ItemStatus.Available)
      .color(command.color)
      .build();

    return this.itemRepository.create(itemToCreate);
  }
}
