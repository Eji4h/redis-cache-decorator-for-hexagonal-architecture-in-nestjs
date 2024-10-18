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

  private readonly host: string;
  private readonly port: number;
  private readonly password: string;

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
      password: this.password,
    });
    await this.redisInstance.info();
  }

  disconnect() {
    this.redisInstance.disconnect();
  }
}
