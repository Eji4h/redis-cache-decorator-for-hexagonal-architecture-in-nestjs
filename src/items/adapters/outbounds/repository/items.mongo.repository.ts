import { Inject, Injectable } from '@nestjs/common';
import { FindAllQuery, ItemsRepository } from '../../../applications/ports';
import { InjectModel } from '@nestjs/mongoose';
import { ItemCollectionName } from './mongo/item.mongo.schema';
import { Model, Types } from 'mongoose';
import { ItemAttributes, IItem, ItemId, Item } from '../../../domains';
import { ItemMongoModel } from './mongo/item.mongo.model';
import { Builder } from 'builder-pattern';
import {
  CacheForRepository,
  InvalidateRedisCacheForRepository,
} from '../../../../shares/adapters/redisCache';
import { redisCacheTtlMinutes } from '../../../../shares/adapters/configs';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class ItemsMongoRepository implements ItemsRepository {
  private static readonly cacheKey = 'items';

  constructor(
    @InjectModel(ItemCollectionName)
    private itemModel: Model<ItemMongoModel>,
    @Inject(CACHE_MANAGER)
    private _cacheManager: Cache,
  ) {}

  @InvalidateRedisCacheForRepository({
    baseKey: ItemsMongoRepository.cacheKey,
    keyCombinations: [['id']],
  })
  async create(newItem: IItem): Promise<IItem> {
    const newItemModel = new this.itemModel(newItem);
    const createdItem = await newItemModel.save();

    return ItemsMongoRepository.toDomain(createdItem);
  }

  @CacheForRepository({
    baseKey: ItemsMongoRepository.cacheKey,
    mapper: ItemsMongoRepository.toDomain,
    ttlMinutes: redisCacheTtlMinutes,
  })
  async findAll(query: FindAllQuery): Promise<IItem[]> {
    const items = await this.itemModel.find(query);
    console.debug(
      'Request was flighted through mongoose repository to find all',
    );

    return items.map(ItemsMongoRepository.toDomain);
  }

  @CacheForRepository({
    baseKey: ItemsMongoRepository.cacheKey,
    keyNames: ['id'],
    mapper: ItemsMongoRepository.toDomain,
    ttlMinutes: redisCacheTtlMinutes,
  })
  async findById(itemId: ItemId): Promise<IItem | undefined> {
    const item = await this.itemModel.findById(new Types.ObjectId(itemId));
    console.debug(
      'Request was flighted through mongoose repository to looking for item',
      itemId,
    );

    return item ? ItemsMongoRepository.toDomain(item) : undefined;
  }

  @InvalidateRedisCacheForRepository({
    baseKey: ItemsMongoRepository.cacheKey,
    keyCombinations: [['id']],
  })
  async update(itemToUpdate: IItem): Promise<IItem> {
    const updateItemModel = await this.itemModel.findByIdAndUpdate(
      new Types.ObjectId(itemToUpdate.id),
      itemToUpdate,
      { new: true },
    );

    return ItemsMongoRepository.toDomain(updateItemModel);
  }

  @InvalidateRedisCacheForRepository({
    baseKey: ItemsMongoRepository.cacheKey,
    keyCombinations: [['id']],
  })
  async delete(itemId: ItemId): Promise<void> {
    await this.itemModel.findByIdAndDelete(new Types.ObjectId(itemId));
  }

  private static toDomain(itemModel: ItemMongoModel): IItem {
    return Builder(Item)
      .id(itemModel._id.toString() as ItemId)
      .name(itemModel.name)
      .price(itemModel.price)
      .imageUrl(itemModel.imageUrl)
      .status(itemModel.status)
      .color(itemModel.color)
      .build();
  }
}
