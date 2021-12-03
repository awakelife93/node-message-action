import _ from "lodash";
import CommonEnum from "../enum";
import redis from "../redis";

interface CommonActionIE {
  [functionName: string]: Function;
}

interface CreateActionAndParamsIE {
  actionName: string;
  keys: string[];
}

export const CommonAction: CommonActionIE = {
  deleteUserToken: (keys?: string[]): void => {
    if (_.isEmpty(keys)) {
      redis.firstQueueItemRemove();
    } else {
      _.forEach(keys, (key: string) => {
        redis.remove(key);
      });
    }
  },
};

const createActionAndParams = (action: string): CreateActionAndParamsIE => {
  const parse = action.split("/");

  if (_.isEmpty(parse)) {
    throw new Error(CommonEnum.ErrorStatus.SEND_WRONG_SQS_URL);
  }

  return {
    actionName: parse.shift(),
    keys: [...parse],
  };
};

const actionController = (action: string): void => {
  const { actionName, keys } = createActionAndParams(action);

  if (_.isFunction(CommonAction[actionName])) {
    console.log(
      `Action Calls ${actionName} / key = ${_.isEmpty(keys) ? "없음" : keys}`,
    );
    CommonAction[actionName](keys);
  } else {
    throw new Error(CommonEnum.ErrorStatus.EMPTY_ACTION);
  }
};

export default actionController;
