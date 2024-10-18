import { Provider } from '@nestjs/common';

import { CreateItemCommand, CreateItemUseCase } from './createItem.usecase';
import { DeleteItemByIdUseCase } from './deleteItemById.usecase';
import { GetItemByIdUseCase } from './getItemById.usecase';
import { GetItemsUseCase } from './getItems.usecase';
import { UpdateItemCommand, UpdateItemUseCase } from './updateItem.usecase';

export const UseCases: Provider[] = [
  UpdateItemUseCase,
  GetItemsUseCase,
  GetItemByIdUseCase,
  DeleteItemByIdUseCase,
  CreateItemUseCase,
];

export {
  CreateItemCommand,
  CreateItemUseCase,
  DeleteItemByIdUseCase,
  GetItemByIdUseCase,
  GetItemsUseCase,
  UpdateItemCommand,
  UpdateItemUseCase,
};
