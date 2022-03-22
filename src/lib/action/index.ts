import _ from "lodash";
import config from "../config";
import CommonEnum from "../enum";
import ws from "../protocol/ws";
import CommonAction from "./action";
import { createActionItems, ICreateActionAndParams } from "./preprocessor";

const actionController = ({
  action,
  params = "",
}: {
  action: string;
  params?: string;
}): string => {
  const { actionName, keys }: ICreateActionAndParams = createActionItems(
    action,
    params,
  );

  if (_.isFunction(CommonAction[actionName])) {
    console.log(
      `Action Calls ${actionName} / key = ${_.isEmpty(keys) ? "없음" : keys}`,
    );

    return CommonAction[actionName](keys);
  } else {
    throw new Error(CommonEnum.ErrorStatus.EMPTY_ACTION);
  }
};

export const responseController = (responseMessage: string) => {
  if (config.IS_SEND_TO_SOCKET_SUBSCRIBE) {
    ws.sendMessage(responseMessage);
  }

  return responseMessage;
};

export default actionController;
