import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Builder } from 'builder-pattern';
import { isUndefined, omitBy } from 'lodash';
import { Model, RootFilterQuery, Types } from 'mongoose';
import { sleep } from 'radash';

import { redisCacheTtlMinutes } from '../../../../shares/adapters/configs';
import {
  CacheForRepository,
  InvalidateRedisCacheForRepository,
} from '../../../../shares/adapters/redisCache';
import { ItemsRepository } from '../../../applications/ports';
import { IItem, Item, ItemColor, ItemId, ItemStatus } from '../../../domains';
import { ItemMongoModel } from './mongo/item.mongo.model';
import { ItemCollectionName } from './mongo/item.mongo.schema';

const simulateSlowDatabaseDelay = 5 * 1000;

@Injectable()
export class ItemsMongoRepository implements ItemsRepository {
  private static readonly cacheKey = 'items';

  constructor(
    @InjectModel(ItemCollectionName)
    private readonly itemModel: Model<ItemMongoModel>,
    @Inject(CACHE_MANAGER)
    private readonly _cacheManager: Cache,
  ) {}

  @InvalidateRedisCacheForRepository({
    baseKey: ItemsMongoRepository.cacheKey,
    keyCombinations: [['id'], ['country', 'category'], ['status', 'color']],
  })
  async create(newItem: IItem): Promise<IItem> {
    const newItemModel = new this.itemModel(newItem);
    const createdItem = await newItemModel.save();

    return ItemsMongoRepository.toDomain(createdItem);
  }

  @CacheForRepository({
    baseKey: ItemsMongoRepository.cacheKey,
    keyNames: ['all'],
    mapper: ItemsMongoRepository.toDomain,
    ttlMinutes: redisCacheTtlMinutes,
  })
  async findAll(): Promise<IItem[]> {
    await sleep(simulateSlowDatabaseDelay);
    const items = await this.itemModel.find();
    return items.map(ItemsMongoRepository.toDomain);
  }

  @CacheForRepository({
    baseKey: ItemsMongoRepository.cacheKey,
    keyNames: ['id'],
    mapper: ItemsMongoRepository.toDomain,
    ttlMinutes: redisCacheTtlMinutes,
  })
  async findById(itemId: ItemId): Promise<IItem | undefined> {
    await sleep(simulateSlowDatabaseDelay);
    const item = await this.itemModel.findById(new Types.ObjectId(itemId));
    return item ? ItemsMongoRepository.toDomain(item) : undefined;
  }

  @CacheForRepository({
    baseKey: ItemsMongoRepository.cacheKey,
    mapper: ItemsMongoRepository.toDomain,
    ttlMinutes: redisCacheTtlMinutes,
    keyNames: ['status', 'color'],
  })
  async findByStatusAndColor(
    status: ItemStatus | undefined,
    color: ItemColor | undefined,
  ): Promise<IItem[]> {
    await sleep(simulateSlowDatabaseDelay);
    const findBy: RootFilterQuery<ItemMongoModel> = {
      status,
      color,
    };
    const finalQuery = omitBy(findBy, isUndefined);

    const items = await this.itemModel.find(finalQuery);
    return items.map(ItemsMongoRepository.toDomain);
  }

  @CacheForRepository({
    baseKey: ItemsMongoRepository.cacheKey,
    keyNames: ['country', 'category'],
    mapper: ItemsMongoRepository.toDomain,
    ttlMinutes: redisCacheTtlMinutes,
  })
  async findByCountryAndCategory(
    country: string,
    category: string,
  ): Promise<IItem[]> {
    await sleep(simulateSlowDatabaseDelay);
    const findBy: RootFilterQuery<ItemMongoModel> = {
      country,
      category,
    };
    const finalQuery = omitBy(findBy, isUndefined);

    const items = await this.itemModel.find(finalQuery);
    return items.map(ItemsMongoRepository.toDomain);
  }

  @InvalidateRedisCacheForRepository({
    baseKey: ItemsMongoRepository.cacheKey,
    keyCombinations: [['id'], ['country', 'category'], ['status', 'color']],
  })
  async update(itemToUpdate: IItem): Promise<IItem> {
    const updateItemModel = await this.itemModel.findByIdAndUpdate(
      new Types.ObjectId(itemToUpdate.id),
      itemToUpdate,
      { new: true },
    );

    return ItemsMongoRepository.toDomain(updateItemModel);
  }

  private static toDomain(itemModel: ItemMongoModel): IItem {
    return Builder(Item)
      .id(itemModel._id.toString() as ItemId)
      .name(itemModel.name)
      .price(itemModel.price)
      .imageUrl(itemModel.imageUrl)
      .status(itemModel.status)
      .color(itemModel.color)
      .country(itemModel.country)
      .category(itemModel.category)
      .build();
  }
}
