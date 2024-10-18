const cacheRepositorySymbolToken: unique symbol = Symbol(
  'CacheRepositoryToken',
);
export const cacheRepositoryToken = cacheRepositorySymbolToken.toString();

export interface CacheRepository {
  connect(): Promise<void>;
  disconnect(): void;
}
