import _ from "lodash";
import redis from "redis";
import { promisify } from "util";
import config from "../config";

class Redis {
  private client: redis.RedisClient;

  constructor() {
    this.client = redis.createClient({
      host: config.REDIS_HOST,
      port: config.REDIS_PORT,
    });
  }

  private keys(pattern: string = "*"): Promise<string[]> {
    return promisify(this.client.keys).bind(this.client)(pattern) ?? [];
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
