import _ from "lodash";
import { responseController } from ".";
import redis from "../databases/redis";

type CommonAction = {
  [functionName: string]: Function;
};
const commonAction: CommonAction = {
  deleteUserToken: async (keys: string[]): Promise<string> => {
    if (_.isEmpty(keys)) {
      await redis.firstQueueItemRemove();
    } else {
      _.forEach(keys, async (key: string) => {
        await redis.remove(key);
      });
    }

    return responseController("call deleteUserToken");
  },
};

export default commonAction;
