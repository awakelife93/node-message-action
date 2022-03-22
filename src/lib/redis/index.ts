import _ from "lodash";
import * as redis from "redis";
import { promisify } from "util";
import env from "../config";

class Redis {
  private client!: redis.RedisClient;

  connectRedis = async (): Promise<void> => {
    try {
      this.client = await redis.createClient({
        host: env.REDIS_HOST,
        port: Number(env.REDIS_PORT),
      });
    } catch (error: unknown) {
      console.log(`connectRedis Connect Failed!! ${error}`);
    }
  };

  get = (key: string): Promise<string | null> => {
    const _get = promisify(this.client.get).bind(this.client);
    return _get(key);
  };

  set = (key: string, value: string): void => {
    this.client.set(key, value);
  };

  remove = (key: string): void => {
    if (!_.isEmpty(key)) {
      this.client.del(key);
      console.log(`============> redis remove ${key}`);
    }
  };

  allKeys = (): Promise<string[]> => {
    const _keys = promisify(this.client.keys).bind(this.client);
    return _keys("*");
  };

  /**
   * FIFO
   * @returns {Promise<string[]>}
   */
  firstQueueItemRemove = async () => {
    const keys = await this.allKeys();

    if (!_.isEmpty(keys)) {
      const queue = keys.shift();

      if (!_.isUndefined(queue)) {
        this.remove(queue);
      }
    }
  };
}

export default new Redis();
