import { Inject, Injectable } from '@nestjs/common';
import { match } from 'ts-pattern';

import { IItem, ItemColor, ItemStatus } from '../../domains';
import {
  ItemsRepository,
  ItemsRepositoryToken,
} from '../ports/items.repository';

export interface GetItemsByStatusAndColorQuery {
  status?: ItemStatus;
  color?: ItemColor;
}

export interface GetItemsByCountryAndCategoryQuery {
  country?: string;
  category?: string;
}

export type GetItemsQuery =
  | GetItemsByStatusAndColorQuery
  | GetItemsByCountryAndCategoryQuery;

@Injectable()
export class GetItemsUseCase {
  constructor(
    @Inject(ItemsRepositoryToken)
    private readonly itemRepository: ItemsRepository,
  ) {}

  async execute(query: GetItemsQuery): Promise<IItem[]> {
    return match(query)
      .when(this.isGetItemsByStatusAndColorQuery, ({ status, color }) => {
        return this.itemRepository.findByStatusAndColor(status, color);
      })
      .when(
        this.isGetItemsByCountryAndCategoryQuery,
        ({ country, category }) => {
          return this.itemRepository.findByCountryAndCategory(
            country,
            category,
          );
        },
      )
      .otherwise(() => {
        return this.itemRepository.findAll();
      });
  }

  isGetItemsByStatusAndColorQuery(
    query: GetItemsByStatusAndColorQuery,
  ): query is GetItemsByStatusAndColorQuery {
    return !!query.status || !!query.color;
  }

  isGetItemsByCountryAndCategoryQuery(
    query: GetItemsByCountryAndCategoryQuery,
  ): query is GetItemsByCountryAndCategoryQuery {
    return !!query.country || !!query.category;
  }
}
