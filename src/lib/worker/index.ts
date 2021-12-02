import env from "../env";
import expressController from "../protocol/express";
import WebSocket from "../protocol/ws";
import redis from "../redis";

const work = async () => {
  // * connect redis
  await redis.connectRedis();

  if (env.IS_SEND_TO_SOCKET_SUBSCRIBE) {
    // * connect web socket server
    await WebSocket.connect();
  } else {
    // * connect http server
    await expressController();
  }
};

export default work;
