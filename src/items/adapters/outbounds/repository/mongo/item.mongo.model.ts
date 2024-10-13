import type { Types } from 'mongoose';
import { ItemAttributes } from '../../../../domains';

export interface ItemMongoModel extends Omit<ItemAttributes, 'id'> {
  _id: Types.ObjectId;
}
