import config from "../config";
import expressController from "../protocol/express";
import WebSocket from "../protocol/ws";

const work = async () => {
  if (config.IS_SEND_TO_SOCKET_SUBSCRIBE) {
    // * connect web socket server
    console.log("StateFul Connect");
    await WebSocket.connect();
  } else {
    // * connect http server
    console.log("StateLess Connect");
    await expressController();
  }
};

export default work;
