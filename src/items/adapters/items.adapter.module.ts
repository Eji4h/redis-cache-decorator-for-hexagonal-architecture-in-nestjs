import { Global, Module } from '@nestjs/common';
import { ItemsV1Controller } from './inbounds/items.v1.controller';
import { ItemsRepositoryToken } from '../applications/ports';
import { ItemsMongoRepository } from './outbounds/repository/items.mongo.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoUri, redisHost } from '../../shares/adapters/configs';
import {
  ItemCollectionName,
  ItemMongoSchema,
} from './outbounds/repository/mongo/item.mongo.schema';
import { redisStore } from 'cache-manager-ioredis-yet';
import { CacheModule } from '@nestjs/cache-manager';

@Global()
@Module({
  imports: [
    CacheModule.registerAsync<Parameters<typeof redisStore>[0]>({
      isGlobal: true,
      useFactory: async () => {
        const store = await redisStore({
          host: redisHost,
        });

        return { isGlobal: true, store };
      },
    }),
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
