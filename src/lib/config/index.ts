import "dotenv/config";

export default {
  SQS_SERVER_END_POINT: process.env.SQS_SERVER_END_POINT ?? "localhost:3000",
  SUB_SCRIBE_A_SERVER_PORT: process.env.port ?? 5005,
  IS_SEND_TO_SOCKET_SUBSCRIBE:
    process.env.IS_SEND_TO_SOCKET_SUBSCRIBE === "true" ? true : false,
  REDIS_HOST: process.env.REDIS_HOST ?? "127.0.0.1",
  REDIS_PORT: process.env.REDIS_PORT ?? 6379,
  PARAMS_SPLIT_TYPE: process.env.PARAMS_SPLIT_TYPE ?? "/",
};
