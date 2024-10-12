import { Global, Module } from '@nestjs/common';
import { ItemsV1Controller } from './inbounds/items.v1.controller';

@Global()
@Module({
  controllers: [ItemsV1Controller],
})
export class ItemsAdapterModule {}
