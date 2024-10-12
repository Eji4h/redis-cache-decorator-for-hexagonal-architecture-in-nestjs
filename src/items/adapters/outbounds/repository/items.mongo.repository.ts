import { Injectable } from '@nestjs/common';
import { FindAllQuery, ItemsRepository } from '../../../applications/ports';
import { InjectModel } from '@nestjs/mongoose';
import { ItemCollectionName } from './mongo/item.mongo.schema';
import { Model, Types } from 'mongoose';
import { ItemAttributes, IItem, ItemId, Item } from 'src/items/domains';
import { ItemMongoModel } from './mongo/item.mongo.model';
import { Builder } from 'builder-pattern';

@Injectable()
export class ItemsMongoRepository implements ItemsRepository {
  constructor(
    @InjectModel(ItemCollectionName)
    private itemModel: Model<ItemMongoModel>,
    @Inject(ItemsCacheRepositoryToken)
    private readonly itemCacheRepository: ItemsCacheRepository,
  ) {}
  ...
  async findById(itemId: ItemId): Promise<IItem | undefined> {
    const itemFromCached = await this.itemCacheRepository.get(itemId);
    if (itemFromCached) {
      return itemFromCached;
    }
    const item = await this.itemModel.findById(new Types.ObjectId(itemId));

    return item ? ItemsMongoRepository.toDomain(item) : undefined;
  }
  ...
  private static toDomain(itemModel: ItemMongoModel): IItem {
    return Builder(Item)
      .itemId(itemModel._id.toString() as ItemId)
      .name(itemModel.name)
      .price(itemModel.price)
      .imageUrl(itemModel.imageUrl)
      .available(itemModel.available)
      .build();
  }
}
