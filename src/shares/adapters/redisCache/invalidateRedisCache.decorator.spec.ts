import { Builder } from 'builder-pattern';

import { Item, ItemStatus } from '../../../items/domains';
import {
  generateKeyFromCombination,
  KeyCombination,
} from './invalidateRedisCache.decorator';

describe('InvalidateRedisCacheForRepository', () => {
  describe('generateKeyFromCombination', () => {
    it.each`
      name                      | status
      ${'JavaScriptBangkok2.0'} | ${ItemStatus.Available}
      ${'JavaScriptBangkok2.0'} | ${ItemStatus.Unavailable}
      ${'JavaScriptBangkok2.0'} | ${ItemStatus.Obsoleted}
    `(
      'should be {name:$name,status:$status}',
      ({ name, status }: { name: string; status: ItemStatus }) => {
        // Arrange
        const item = Builder(Item).name(name).status(status).build();
        const baseKey = 'test:items';
        const expected = `${baseKey}:{name:${name},status:${status}}`;
        const keyCombination: KeyCombination<Item> = ['name', 'status'];

        // Act
        const actual = generateKeyFromCombination(
          baseKey,
          keyCombination,
          item,
        );

        // Assert
        expect(actual).toBe(expected);
      },
    );
  });
});
