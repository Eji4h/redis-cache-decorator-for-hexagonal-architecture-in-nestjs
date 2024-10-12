import { Provider } from '@nestjs/common';
import { UpdateItemUsecase } from './updateItem.usecase';
import { GetItemsUseCase } from './getItems.usecase';

export const UseCases: Provider[] = [UpdateItemUsecase, GetItemsUseCase];
