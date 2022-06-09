import cors from "cors";
import express, { Request, Response } from "express";
import helmet from "helmet";
import http from "http";
import _ from "lodash";
import path from "path";
import actionController from "../../action";
import config from "../../config";
import middlewareController from "./middleware";
import CommonWorkerRoutes, { CommonWorkerRouteType } from "./routes";

const expressController = (): http.Server => {
  const app: express.Application = createExpress();
  return createExpressServer(app);
};

const createExpress = (): express.Application => {
  const corsConfig = {
    // * subscribe servers origin
    origin: [config.SQS_SERVER_END_POINT],
    credentials: true,
  };

  const app: express.Application = express();

  app.use(helmet());
  app.use(cors(corsConfig));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, "public")));
  createRoute(app);

  return app;
};

const createRoute = (app: express.Application): void => {
  _.forEach(CommonWorkerRoutes, (CommonWorkerRoute: CommonWorkerRouteType) => {
    app[CommonWorkerRoute.method](
      CommonWorkerRoute.path,
      middlewareController,
      async (request: Request, response: Response) => {
        try {
          const params = request.body.params ?? "";
          const action = request.route.path.replace("/", "");
          const result = await actionController({
            action,
            params,
          });

          response.status(200);
          response.send(result);
        } catch (error: any) {
          // todo: error code 작성하기.
          // todo: error 공통 타입 작성하기.
          response.status(500);
          response.send(error.message ?? error);
        }
      },
    );
  });
};

const createExpressServer = (app: express.Application): http.Server => {
  return app.listen(config.port, () => {
    console.log(`SUB_SCRIBE_A_SERVER_PORT ${config.port}`);
  });
};

export default expressController;
