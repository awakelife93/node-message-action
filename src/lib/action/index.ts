import _ from "lodash";
import CommonEnum from "../enum";
import env from "../env";
import ws from "../protocol/ws";
import redis from "../redis";
import { CreateActionAndParamsIE, createActionItems } from "./preprocessor";

interface CommonActionIE {
  [functionName: string]: Function;
}
export const CommonAction: CommonActionIE = {
  deleteUserToken: async (keys?: string[]): Promise<string> => {
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

const actionController = ({
  action,
  params = ""
} : {
  action: string;
  params?: string;
}): string => {
  const { actionName, keys }: CreateActionAndParamsIE = createActionItems(action, params);
  
  if (_.isFunction(CommonAction[actionName])) {
    console.log(
      `Action Calls ${actionName} / key = ${_.isEmpty(keys) ? "없음" : keys}`,
    );

    return CommonAction[actionName](keys);
  } else {
    throw new Error(CommonEnum.ErrorStatus.EMPTY_ACTION);
  }
};

const responseController = (responseMessage: string) => {
  if (env.IS_SEND_TO_SOCKET_SUBSCRIBE) {
    ws.sendMessage(responseMessage);
  } else {
    return responseMessage;
  }
};

export default actionController;
