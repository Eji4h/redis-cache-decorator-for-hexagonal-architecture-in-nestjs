import { Global, Module } from '@nestjs/common';
import { UseCases } from './usecases';

@Global()
@Module({
  providers: [...UseCases],
  exports: [...UseCases],
})
export class ItemsApplicationModule {}
