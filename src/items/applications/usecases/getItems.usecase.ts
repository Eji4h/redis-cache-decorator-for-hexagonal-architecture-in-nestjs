import { Injectable } from '@nestjs/common';
import { ItemsRepository } from '../ports/items.repository';
import { IItem } from '../../domains';

@Injectable()
export class GetItemsUseCase {
  constructor(private readonly itemRepository: ItemsRepository) {}

  async execute(): Promise<IItem[]> {
    return this.itemRepository.findAll();
  }
}
