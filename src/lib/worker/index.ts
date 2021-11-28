import env from "../env";
import expressController from "../protocol/express";
import WebSocket from "../protocol/ws";

const work = () => {
  /**
   * @description
   * Connect Socket
   */
  if (env.IS_SEND_TO_SOCKET_SUBSCRIBE) {
    WebSocket.connect();
  } else {
    expressController();
  }
};

export default work;
