import "dotenv/config";

export default {
  SQS_SERVER_END_POINT: process.env.SQS_SERVER_END_POINT ?? "localhost:3000",
  IS_SEND_TO_SOCKET_SUBSCRIBE:
    process.env.IS_SEND_TO_SOCKET_SUBSCRIBE === "true" ?? true,
};
