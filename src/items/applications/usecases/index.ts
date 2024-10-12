import { Provider } from '@nestjs/common';
import { UpdateItemUsecase } from './updateItem.usecase';
import { GetItemsUseCase } from './getItems.usecase';
import { GetItemByIdUseCase } from './getItemById.usecase';
import { DeleteItemByIdUseCase } from './deleteItemById.usecase';
import { CreateItemUseCase } from './createItem.usecase';

export const UseCases: Provider[] = [
  UpdateItemUsecase,
  GetItemsUseCase,
  GetItemByIdUseCase,
  DeleteItemByIdUseCase,
  CreateItemUseCase,
];

export {
  UpdateItemUsecase,
  GetItemsUseCase,
  GetItemByIdUseCase,
  DeleteItemByIdUseCase,
  CreateItemUseCase,
};
