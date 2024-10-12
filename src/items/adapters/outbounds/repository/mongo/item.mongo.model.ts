import type { Types } from 'mongoose';
import { ItemAttributes } from '../../../../domains';

export interface ItemMongoModel extends Omit<ItemAttributes, 'itemId'> {
  _id: Types.ObjectId;
}
