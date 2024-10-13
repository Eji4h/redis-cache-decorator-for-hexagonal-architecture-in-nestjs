import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ItemMongoModel } from './item.mongo.model';
import { ItemStatus, ItemColor } from 'src/items/domains';

export const ItemCollectionName = 'items';

@Schema({ collection: ItemCollectionName })
export class ItemSchema implements Omit<ItemMongoModel, '_id'> {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({ required: false, default: ItemStatus.Available })
  status: ItemStatus;

  @Prop({ required: true })
  color: ItemColor;
}

export const ItemMongoSchema = SchemaFactory.createForClass(ItemSchema);
ItemMongoSchema.index({ available: 1 });
