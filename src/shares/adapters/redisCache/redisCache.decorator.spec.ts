import { Cache, CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Builder } from 'builder-pattern';

import {
  IItem,
  Item,
  ItemColor,
  ItemId,
  ItemStatus,
} from '../../../items/domains';
import { CacheForRepository } from './redisCache.decorator';

class TestRepository {
  private static readonly cacheKey = 'test';
  private readonly item1 = Builder(Item)
    .id('1' as ItemId)
    .name('item1')
    .price(100)
    .imageUrl('image1')
    .status(ItemStatus.Available)
    .color(ItemColor.Red)
    .build();

  private readonly item2 = Builder(Item)
    .id('2' as ItemId)
    .name('item2')
    .price(200)
    .imageUrl('image2')
    .status(ItemStatus.Unavailable)
    .color(ItemColor.Blue)
    .build();

  private readonly items = [this.item1, this.item2];

  private _findAllSpyCounter = 0;
  public get findAllSpyCounter() {
    return this._findAllSpyCounter;
  }

  private _findByIdSpyCounter = 0;
  public get findByIdSpyCounter() {
    return this._findByIdSpyCounter;
  }

  private _findByStatusAndColorSpyCounter = 0;
  public get findByStatusAndColorSpyCounter() {
    return this._findByStatusAndColorSpyCounter;
  }

  constructor(
    @Inject(CACHE_MANAGER)
    private readonly _cacheManager: Cache,
  ) {}

  @CacheForRepository({
    baseKey: TestRepository.cacheKey,
    mapper: TestRepository.toDomain,
    keyNames: ['all'],
    ttlMinutes: 10,
  })
  async findAll(): Promise<Item[]> {
    this._findAllSpyCounter++;
    return this.items.map(TestRepository.toDomain);
  }

  @CacheForRepository({
    baseKey: TestRepository.cacheKey,
    mapper: TestRepository.toDomain,
    keyNames: ['id'],
    ttlMinutes: 10,
  })
  async findById(id: ItemId) {
    this._findByIdSpyCounter++;
    return this.items.find((item) => item.id === id);
  }

  @CacheForRepository({
    baseKey: TestRepository.cacheKey,
    mapper: TestRepository.toDomain,
    keyNames: ['status', 'color'],
    ttlMinutes: 10,
  })
  async findByStatusAndColor(status: ItemStatus, color: ItemColor) {
    this._findByStatusAndColorSpyCounter++;
    return this.items.filter(
      (item) => item.status === status && item.color === color,
    );
  }

  private static toDomain(itemModel: IItem): IItem {
    return Builder(Item)
      .id(itemModel.id)
      .name(itemModel.name)
      .price(itemModel.price)
      .imageUrl(itemModel.imageUrl)
      .status(itemModel.status)
      .color(itemModel.color)
      .build();
  }
}

describe('CacheForRepository', () => {
  let testRepository: TestRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CacheModule.register()],
      providers: [TestRepository],
    }).compile();

    testRepository = moduleRef.get(TestRepository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('spyCounter should be 1 when many call findAll', async () => {
    // Act
    await testRepository.findAll();
    await testRepository.findAll();
    await testRepository.findAll();

    // Assert
    expect(testRepository.findAllSpyCounter).toEqual(1);
  });

  it('spyCounter should be 1 when many call findById', async () => {
    // Arrange
    const itemId = '1' as ItemId;

    // Act
    await testRepository.findById(itemId);
    await testRepository.findById(itemId);
    await testRepository.findById(itemId);

    // Assert
    expect(testRepository.findByIdSpyCounter).toEqual(1);
  });

  it('spyCounter should be 1 when many call findByStatusAndColor', async () => {
    // Arrange
    const status = ItemStatus.Available;
    const color = ItemColor.Red;

    // Act
    await testRepository.findByStatusAndColor(status, color);
    await testRepository.findByStatusAndColor(status, color);
    await testRepository.findByStatusAndColor(status, color);

    // Assert
    expect(testRepository.findByStatusAndColorSpyCounter).toEqual(1);
  });
});
