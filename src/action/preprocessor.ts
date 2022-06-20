import _ from "lodash";
import config from "../config";
import CommonEnum from "../enum";

export type CreateActionAndParams = {
  actionName: string;
  keys: string[];
};
export const createWSParams = (action: string): CreateActionAndParams => {
  const parse = action.split(config.PARAMS_SPLIT_TYPE);

  if (_.isEmpty(parse)) {
    throw new Error(CommonEnum.ErrorStatus.SEND_WRONG_SQS_URL);
  }

  return {
    actionName: parse.shift() ?? "",
    keys: [...parse],
  };
};

export const createHttpParams = (params: string): string[] => {
  return params.split(config.PARAMS_SPLIT_TYPE);
};

export const createActionItems = (
  action: string,
  params: string,
): CreateActionAndParams => {
  let actionName = "",
    keys: string[] = [];

  if (config.IS_SEND_TO_SOCKET_SUBSCRIBE) {
    const actionItem = createWSParams(action);
    actionName = actionItem.actionName;
    keys = [...actionItem.keys];
  } else {
    actionName = action;
    keys = [...createHttpParams(params)];
  }

  return {
    actionName,
    keys,
  };
};
