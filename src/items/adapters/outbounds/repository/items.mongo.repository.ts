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
  ) {}

  async create(newItem: Omit<ItemAttributes, 'itemId'>): Promise<IItem> {
    const newItemModel = new this.itemModel(newItem);
    const createdItem = await newItemModel.save();

    return ItemsMongoRepository.toDomain(createdItem);
  }

  async findAll(query: FindAllQuery): Promise<IItem[]> {
    const items = await this.itemModel.find(query);

    return items.map(ItemsMongoRepository.toDomain);
  }

  async findById(itemId: ItemId): Promise<IItem | undefined> {
    const item = await this.itemModel.findById(new Types.ObjectId(itemId));

    return item ? ItemsMongoRepository.toDomain(item) : undefined;
  }

  async update(itemToUpdate: IItem): Promise<IItem> {
    const updateItemModel = await this.itemModel.findByIdAndUpdate(
      new Types.ObjectId(itemToUpdate.itemId),
      itemToUpdate,
      { new: true },
    );

    return ItemsMongoRepository.toDomain(updateItemModel);
  }

  async delete(itemId: ItemId): Promise<void> {
    await this.itemModel.findByIdAndDelete(new Types.ObjectId(itemId));
  }

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
