import { Module } from '@nestjs/common';

import { ItemsAdapterModule } from './adapters/items.adapter.module';
import { ItemsApplicationModule } from './applications/items.application.module';

@Module({
  imports: [ItemsAdapterModule, ItemsApplicationModule],
})
export class ItemsModule {}
