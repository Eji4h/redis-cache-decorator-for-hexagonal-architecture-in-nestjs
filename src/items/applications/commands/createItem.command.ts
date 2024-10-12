import { ItemAttributes } from '../../domains';

export type CreateItemCommand = Omit<ItemAttributes, 'itemId' | 'available'> &
  Partial<Pick<ItemAttributes, 'available'>>;
