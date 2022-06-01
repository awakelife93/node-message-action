import _ from "lodash";
import * as redis from "redis";
import { promisify } from "util";
import config from "../config";

class Redis {
  private client!: redis.RedisClient;

  private allKeys(): Promise<string[]> {
    return promisify(this.client.keys).bind(this.client)("*") ?? [];
  }

  async connectRedis(): Promise<void> {
    try {
      this.client = await redis.createClient({
        host: config.REDIS_HOST,
        port: Number(config.REDIS_PORT),
      });
    } catch (error: unknown) {
      console.log(`connectRedis Connect Failed!! ${error}`);
    }
  }

  async firstQueueItemRemove() {
    const keys = await this.allKeys();
    const firstKey = keys.shift();

    if (!_.isUndefined(firstKey)) {
      this.remove(firstKey);
    }
  }

  get(key: string): Promise<string | null> {
    return promisify(this.client.get).bind(this.client)(key);
  }

  set(key: string, value: string): void {
    this.client.set(key, value);
  }

  remove(key: string): void {
    this.client.del(key);
  }
}

export default new Redis();
