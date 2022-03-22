import _ from "lodash";
import { responseController } from ".";
import redis from "../redis";

interface ICommonAction {
  [functionName: string]: Function;
}
const CommonAction: ICommonAction = {
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

export default CommonAction;
