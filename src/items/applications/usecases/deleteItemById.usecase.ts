import { Inject, Injectable } from '@nestjs/common';
import { ItemId } from '../../domains';
import { ItemsRepositoryToken, ItemsRepository } from '../ports';

@Injectable()
export class DeleteItemByIdUseCase {
  constructor(
    @Inject(ItemsRepositoryToken)
    private readonly itemRepository: ItemsRepository,
  ) {}

  async execute(itemId: ItemId): Promise<void> {
    await this.itemRepository.delete(itemId);
  }
}
