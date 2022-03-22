import _ from "lodash";
import CommonEnum from "../enum";
import env from "../config";

export interface ICreateActionAndParams {
  actionName: string;
  keys: string[];
}
export const createWSParams = (action: string): ICreateActionAndParams => {
  const parse = action.split(env.PARAMS_SPLIT_TYPE);

  if (_.isEmpty(parse)) {
    throw new Error(CommonEnum.ErrorStatus.SEND_WRONG_SQS_URL);
  }

  return {
    actionName: parse.shift() ?? "",
    keys: [...parse],
  };
};

export const createHttpParams = (params: string): string[] => {
  return params.split(env.PARAMS_SPLIT_TYPE);
};

export const createActionItems = (
  action: string,
  params: string,
): ICreateActionAndParams => {
  let actionName = "",
    keys: string[] = [];

  if (env.IS_SEND_TO_SOCKET_SUBSCRIBE) {
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
