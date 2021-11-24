import env from "../env";
import WebSocket from "../protocol/ws";

const work = () => {
  /**
   * @description
   * Connect Socket
   */
  if (env.IS_SEND_TO_SOCKET_SUBSCRIBE) {
    WebSocket.connect();
  } else {
    // todo: express server
  }
};

export default work;
