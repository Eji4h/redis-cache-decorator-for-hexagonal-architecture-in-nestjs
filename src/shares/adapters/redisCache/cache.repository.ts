const cacheRepositorySymbolToken: unique symbol = Symbol('CacheRepositoryToken');
export const cacheRepositoryToken = cacheRepositorySymbolToken.toString();

export interface CacheRepository {
  connect(): Promise<void>;
  getKeysByPattern(pattern: string): Promise<string[]>;
  deleteAllByPattern(pattern: string): Promise<void>;
  getAllByPattern(pattern: string): Promise<string[]>;
  disconnect(): void;
}
