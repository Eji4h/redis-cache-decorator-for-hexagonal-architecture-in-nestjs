import { Provider } from '@nestjs/common';
import { UpdateItemUsecase } from './update-item.usecase';

export const UseCases: Provider[] = [UpdateItemUsecase];
