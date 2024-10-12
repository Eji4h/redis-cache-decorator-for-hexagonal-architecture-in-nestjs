import { Global, Module } from '@nestjs/common';
import { ItemsV1Controller } from './inbounds/items.v1.controller';
import { ItemsRepositoryToken } from '../applications/ports';
import { ItemsMongoRepository } from './outbounds/repository/items.mongo.repository';

@Global()
@Module({
  controllers: [ItemsV1Controller],
  providers: [
    {
      provide: ItemsRepositoryToken,
      useClass: ItemsMongoRepository,
    },
  ],
  exports: [ItemsRepositoryToken],
})
export class ItemsAdapterModule {}
