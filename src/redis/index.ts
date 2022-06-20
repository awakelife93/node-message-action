import _ from "lodash";
import redis from "redis";
import { promisify } from "util";
import config from "../config";

class Redis {
  private client!: redis.RedisClient;

  private keys(pattern: string = "*"): Promise<string[]> {
    return promisify(this.client.keys).bind(this.client)(pattern) ?? [];
  }

  async connect(): Promise<void> {
    try {
      this.client = await redis.createClient({
        host: config.REDIS_HOST,
        port: config.REDIS_PORT,
      });
    } catch (error: unknown) {
      console.log(`Connect Redis Connect Failed!! ${error}`);
    }
  }

  async firstQueueItemRemove(): Promise<void> {
    const keys = await this.keys();
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
