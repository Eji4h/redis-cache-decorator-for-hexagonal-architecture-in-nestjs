import { Provider } from '@nestjs/common';
import { UpdateItemCommand, UpdateItemUseCase } from './updateItem.usecase';
import { GetItemsUseCase } from './getItems.usecase';
import { GetItemByIdUseCase } from './getItemById.usecase';
import { DeleteItemByIdUseCase } from './deleteItemById.usecase';
import { CreateItemCommand, CreateItemUseCase } from './createItem.usecase';

export const UseCases: Provider[] = [
  UpdateItemUseCase,
  GetItemsUseCase,
  GetItemByIdUseCase,
  DeleteItemByIdUseCase,
  CreateItemUseCase,
];

export {
  UpdateItemUseCase,
  UpdateItemCommand,
  CreateItemCommand,
  GetItemsUseCase,
  GetItemByIdUseCase,
  DeleteItemByIdUseCase,
  CreateItemUseCase,
};
