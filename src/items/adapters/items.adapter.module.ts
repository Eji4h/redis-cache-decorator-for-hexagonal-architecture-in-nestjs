import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { mongoUri } from '../../shares/adapters/configs';
import { ItemsRepositoryToken } from '../applications/ports';
import { ItemsV1Controller } from './inbounds/items.v1.controller';
import { ItemsMongoRepository } from './outbounds/repository/items.mongo.repository';
import {
  ItemCollectionName,
  ItemMongoSchema,
} from './outbounds/repository/mongo/item.mongo.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forRoot(mongoUri),
    MongooseModule.forFeature([
      { name: ItemCollectionName, schema: ItemMongoSchema },
    ]),
  ],
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
