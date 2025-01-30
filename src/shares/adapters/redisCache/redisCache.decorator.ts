import { Cache } from '@nestjs/cache-manager';
import { match } from 'ts-pattern';

import { RedisMapper } from './redisCache.type';
import { generateKey, mapDomainToModel } from './redisCache.utils';

type KeyName<Domain> = 'all' | keyof Domain;

type ArgumentReceive<Domain> = number | string | boolean | Date | Domain;

interface PropertyDescriptorOverride<Domain> extends PropertyDescriptor {
  value?: (
    ...args: (ArgumentReceive<Domain> | ArgumentReceive<Domain>[])[]
  ) => Promise<Domain | Domain[]>;
}

export function CacheForRepository<Model, Domain>({
  baseKey,
  mapper,
  keyNames = ['all'],
  ttlMinutes,
}: {
  baseKey: string;
  mapper: RedisMapper<Model, Domain>;
  keyNames: KeyName<Domain>[];
  ttlMinutes?: number;
}) {
  return function (
    _target: unknown,
    _propertyKey: string,
    propertyDescriptor: PropertyDescriptorOverride<Domain>,
  ) {
    const originalMethod = propertyDescriptor.value;
    propertyDescriptor.value = async function (
      ...args: (ArgumentReceive<Domain> | ArgumentReceive<Domain>[])[]
    ): Promise<Domain | Domain[]> {
      const cacheManager: Cache = this._cacheManager;

      const cacheKey = generateKey(keyNames as string[], baseKey, args);

      // return when cache hit
      const model = await cacheManager.get<Model>(cacheKey);
      try {
        if (model) {
          return mapCacheHit<Model, Domain>(cacheKey, model, mapper);
        }
      } catch (e) {
        console.error(`error map cache hit: ${JSON.stringify(e)}`);
      }

      // call original method when cache not hit
      console.debug(`cache not hit: ${cacheKey}`);
      const result = (await originalMethod.apply(this, args)) as
        | Domain
        | Domain[];
      const resultModel = mapDomainToCache(result);

      // Set to cache
      try {
        if (result) {
          const ttl = calculateTTL(ttlMinutes);
          await cacheManager.set(
            cacheKey,
            JSON.parse(JSON.stringify(resultModel)),
            ttl,
          );
        }
      } catch (e) {
        console.error(`error set cache: ${JSON.stringify(e)}`);
      }

      return result;
    };
  };
}

export function calculateTTL(ttlMinutes: number) {
  return ttlMinutes ? ttlMinutes * 60 * 1000 : undefined;
}

function mapDomainToCache<Domain>(result: Domain | Domain[]) {
  return match(result)
    .when(Array.isArray, (result) => result.map(mapDomainToModel))
    .otherwise((result) => (result ? mapDomainToModel(result) : undefined));
}

function mapCacheHit<Model, Domain>(
  cacheKey: string,
  model: Awaited<Model>,
  mapper: RedisMapper<Model, Domain>,
) {
  console.debug(`cache hit: ${cacheKey}`);
  return match(model)
    .when(Array.isArray, (_model) => _model.map(mapper))
    .otherwise((_model) => (_model ? mapper(_model) : undefined));
}
