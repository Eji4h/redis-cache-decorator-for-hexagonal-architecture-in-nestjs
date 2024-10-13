import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ItemId } from '../../domains';
import { ItemsRepositoryToken, ItemsRepository } from '../ports';

@Injectable()
export class DeleteItemByIdUseCase {
  constructor(
    @Inject(ItemsRepositoryToken)
    private readonly itemRepository: ItemsRepository,
  ) {}

  async execute(itemId: ItemId): Promise<void> {
    const itemToDelete = await this.itemRepository.findById(itemId);
    if (!itemToDelete) {
      throw new NotFoundException();
    }
    itemToDelete.obsoleted();

    await this.itemRepository.update(itemToDelete);
  }
}
