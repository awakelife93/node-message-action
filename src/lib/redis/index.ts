import _ from "lodash";
import * as redis from "redis";
import { promisify } from "util";
import env from "../env";

class Redis {
  private client: redis.RedisClient;

  /**
   * 레디스 연결
   * @returns {void}
   */
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

  /**
   * key를 통해 Token을 받아온다.
   * @param {string} key
   * @returns {string} token
   */
  get = (key: string): Promise<string> => {
    const _get = promisify(this.client.get).bind(this.client);
    return _get(key);
  };

  /**
   * key - value Token Insert
   * @param {string} key
   * @param {string} value
   * @returns {void}
   */
  set = (key: string, value: string): void => {
    this.client.set(key, value);
  };

  /**
   * key를 통해 Token을 삭제한다.
   * @param {string} key
   * @param {string} value
   * @returns {void}
   */
  remove = (key: string): void => {
    this.client.del(key);
  };

  /**
   * 전체 키를 얻어온다.
   * @returns {Promise<string[]>}
   */
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
      this.remove(queue);
    }
  };
}

export default new Redis();
