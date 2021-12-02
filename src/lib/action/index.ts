import _ from "lodash";
import redis from "../redis";
interface CommonActionIE {
  [functionName: string]: Function;
}

export const CommonAction: CommonActionIE = {
  deleteUserToken: () => {
    // todo message template에 매개변수도 같이 보낼 것
    redis.remove("");
  },
};

const actionController = (action: string) => {
  if (_.isFunction(CommonAction[action])) {
    CommonAction[action]();
  }
};

export default actionController;
