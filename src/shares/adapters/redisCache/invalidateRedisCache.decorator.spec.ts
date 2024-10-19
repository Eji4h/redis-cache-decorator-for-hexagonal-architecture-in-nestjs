import { Cache } from '@nestjs/cache-manager';
import { Builder } from 'builder-pattern';
import { mockDeep } from 'jest-mock-extended';

import {
  IItem,
  Item,
  ItemColor,
  ItemId,
  ItemStatus,
} from '../../../items/domains';
import {
  generateKeyFromCombination,
  InvalidateRedisCacheForRepository,
  KeyCombination,
} from './invalidateRedisCache.decorator';

class TestRepository {
  public static readonly cacheKey = 'tests';

  constructor(private readonly _cacheManager: Cache) {}

  @InvalidateRedisCacheForRepository({
    baseKey: TestRepository.cacheKey,
    keyCombinations: [['id'], ['status', 'color']],
  })
  async create(newItem: IItem): Promise<IItem> {
    return newItem;
  }

  @InvalidateRedisCacheForRepository({
    baseKey: TestRepository.cacheKey,
    keyCombinations: [['id'], ['status', 'color']],
  })
  async update(itemToUpdate: IItem): Promise<IItem> {
    return itemToUpdate;
  }
}

describe('InvalidateRedisCacheForRepository', () => {
  describe('InvalidateRedisCacheForRepository', () => {
    let cacheManager: Cache;
    let testRepository: TestRepository;
    const item1 = Builder(Item)
      .id('1' as ItemId)
      .name('item1')
      .price(100)
      .imageUrl('image1')
      .status(ItemStatus.Available)
      .color(ItemColor.Red)
      .build();

    const item2 = Builder(Item)
      .id('2' as ItemId)
      .name('item2')
      .price(200)
      .imageUrl('image2')
      .status(ItemStatus.Unavailable)
      .color(ItemColor.Blue)
      .build();

    beforeEach(() => {
      cacheManager = mockDeep<Cache>();
      cacheManager.store.del = jest
        .fn()
        .mockImplementation(() => Promise.resolve());
      testRepository = new TestRepository(cacheManager);
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it.each`
      item
      ${item1}
      ${item2}
    `(
      'should be call del with all keys when call create',
      async ({ item }: { item: IItem }) => {
        // Act
        await testRepository.create(item);

        // Assert
        expect(cacheManager.store.del).toHaveBeenCalledWith(
          `${TestRepository.cacheKey}:all`,
        );
        expect(cacheManager.store.del).toHaveBeenCalledWith(
          `${TestRepository.cacheKey}:{id:${item.id}}`,
        );
        expect(cacheManager.store.del).toHaveBeenCalledWith(
          `${TestRepository.cacheKey}:{status:${item.status},color:${item.color}}`,
        );
      },
    );

    it.each`
      item
      ${item1}
      ${item2}
    `(
      'should be call del with all keys when call update',
      async ({ item }: { item: IItem }) => {
        // Act
        await testRepository.update(item);

        // Assert
        expect(cacheManager.store.del).toHaveBeenCalledWith(
          `${TestRepository.cacheKey}:all`,
        );
        expect(cacheManager.store.del).toHaveBeenCalledWith(
          `${TestRepository.cacheKey}:{id:${item.id}}`,
        );
        expect(cacheManager.store.del).toHaveBeenCalledWith(
          `${TestRepository.cacheKey}:{status:${item.status},color:${item.color}}`,
        );
      },
    );
  });

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
