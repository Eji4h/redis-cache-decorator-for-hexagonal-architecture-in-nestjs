import { Inject, Injectable } from '@nestjs/common';

import { IItem, ItemAttributes, ItemFactory, ItemStatus } from '../../domains';
import { ItemsRepository, ItemsRepositoryToken } from '../ports';

export type CreateItemCommand = Omit<ItemAttributes, 'id' | 'status'> &
  Partial<Pick<ItemAttributes, 'status'>>;

@Injectable()
export class CreateItemUseCase {
  constructor(
    @Inject(ItemsRepositoryToken)
    private readonly itemRepository: ItemsRepository,
  ) {}

  async execute({
    name,
    price,
    imageUrl,
    status,
    color,
  }: CreateItemCommand): Promise<IItem> {
    const itemToCreate = ItemFactory.create({
      name,
      price,
      imageUrl,
      status: status ?? ItemStatus.Available,
      color,
    });
    return this.itemRepository.create(itemToCreate);
  }
}
