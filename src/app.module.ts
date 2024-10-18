import { Module } from '@nestjs/common';

import { ItemsModule } from './items/items.module';
import { SharesModule } from './shares/shares.module';

@Module({
  imports: [ItemsModule, SharesModule],
})
export class AppModule {}
