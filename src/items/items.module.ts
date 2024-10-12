import { Global, Module } from '@nestjs/common';
import { ItemsAdapterModule } from './adapters/items.adapter.module';
import { ItemsApplicationModule } from './applications/items.application.module';

@Global()
@Module({
  imports: [ItemsAdapterModule, ItemsApplicationModule],
})
export class ItemsModule {}
