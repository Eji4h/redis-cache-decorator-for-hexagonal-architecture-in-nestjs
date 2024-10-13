import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { CacheRepository } from './cache.repository';

const RedisConnectionConfigToken = Symbol(
  'RedisConnectionConfigToken',
).toString();

export interface RedisConnectionConfig {
  host: string;
  port: number;
  password: string;
}

@Injectable()
export class RedisCacheRepository implements CacheRepository {
  redisInstance: Redis;

  private host: string;
  private port: number;
  private password: string;

  constructor(
    @Inject(RedisConnectionConfigToken)
    { host, port, password }: RedisConnectionConfig,
  ) {
    this.host = host;
    this.port = port;
    this.password = password;
  }

  async connect() {
    this.redisInstance = new Redis({
      host: this.host,
      port: this.port,
    });
    await this.redisInstance.info();
  }

  getKeysByPattern(pattern: string) {
    return this.redisInstance.keys(`${pattern}:*`);
  }

  async deleteAllByPattern(pattern: string) {
    const keys = await this.getKeysByPattern(pattern);
    const del = (key: string) => this.redisInstance.del(key);
    const delPromises = keys.map(del);
    await Promise.allSettled(delPromises);
  }

  async getAllByPattern(pattern: string) {
    const keys = await this.getKeysByPattern(pattern);
    const get = (key: string) => this.redisInstance.get(key);
    const getPromises = keys.map(get);
    return Promise.all(getPromises);
  }

  disconnect() {
    this.redisInstance.disconnect();
  }
}
