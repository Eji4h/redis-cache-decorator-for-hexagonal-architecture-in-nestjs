import { Cache } from '@nestjs/cache-manager';

export type KeyCombination<Domain> = Array<keyof Domain>;

export function InvalidateRedisCacheForRepository<Domain>({
  baseKey,
  keyCombinations,
}: {
  baseKey: string;
  keyCombinations?: Array<KeyCombination<Domain>>;
}) {
  return function (
    _target: unknown,
    _propertyKey: string,
    propertyDescriptor: PropertyDescriptor,
  ) {
    const originalMethod = propertyDescriptor.value;
    propertyDescriptor.value = async function (...args: unknown[]) {
      const cacheManager: Cache = this._cacheManager;

      const domain = (await originalMethod.apply(this, args)) as Domain;

      const allKeys = `${baseKey}:all`;
      const keyCombinationsMapper = (keyCombination: KeyCombination<Domain>) =>
        generateKeyFromCombination(baseKey, keyCombination, domain);
      const finalKeyCombinations = keyCombinations
        ? keyCombinations.map(keyCombinationsMapper)
        : [];

      const keys = [allKeys, ...finalKeyCombinations];
      await Promise.all(
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        keys.map((key) => cacheManager.store.del(key).catch(() => {})),
      );

      return domain;
    };
  };
}

export function generateKeyFromCombination<Domain>(
  baseKey: string,
  keyCombination: KeyCombination<Domain>,
  domain: Domain,
) {
  const suffixKey = keyCombination
    .reduce((acc, key) => `${acc}${key.toString()}:${domain[key]},`, '')
    .slice(0, -1);
  const key = `${baseKey}:{${suffixKey}}`;
  return key;
}
