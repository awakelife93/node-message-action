import _ from "lodash";
import config from "../config";
import CommonEnum from "../enum";
import ws from "../protocol/ws";
import commonAction from "./action";
import { CreateActionAndParams, createActionItems } from "./preprocessor";

const actionController = ({
  action,
  params = "",
}: {
  action: string;
  params?: string;
}): string => {
  const { actionName, keys }: CreateActionAndParams = createActionItems(
    action,
    params,
  );

  if (_.isFunction(commonAction[actionName])) {
    console.log(
      `Action Calls ${actionName} / key = ${_.isEmpty(keys) ? "없음" : keys}`,
    );

    return commonAction[actionName](keys);
  } else {
    throw new Error(CommonEnum.ErrorStatus.EMPTY_ACTION);
  }
};

export const responseController = (responseMessage: string): string => {
  if (config.IS_SEND_TO_SOCKET_SUBSCRIBE) {
    ws.sendMessage(responseMessage);
  }

  return responseMessage;
};

export default actionController;
