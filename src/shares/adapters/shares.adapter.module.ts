import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { redisStore } from 'cache-manager-ioredis-yet';
import { redisHost, redisPassword } from './configs';

@Module({
  imports: [
    CacheModule.registerAsync<Parameters<typeof redisStore>[0]>({
      isGlobal: true,
      useFactory: async () => {
        const store = await redisStore({
          host: redisHost,
          password: redisPassword,
        });

        return { isGlobal: true, store };
      },
    }),
  ],
  exports: [CacheModule],
})
export class SharesAdapterModule {}
