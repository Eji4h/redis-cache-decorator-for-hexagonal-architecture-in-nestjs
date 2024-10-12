import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ItemMongoModel } from './item.mongo.model';

export const ItemCollectionName = 'items';

@Schema({ collection: ItemCollectionName })
export class ItemSchema implements Omit<ItemMongoModel, '_id'> {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({ required: false, default: true })
  available: boolean;
}

export const ItemSchemaMongo = SchemaFactory.createForClass(ItemSchema);
ItemSchemaMongo.index({ available: 1 });
