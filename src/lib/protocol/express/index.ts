import cors from "cors";
import express, { Request, Response } from "express";
import http from "http";
import _ from "lodash";
import path from "path";
import env from "../../env";
import middlewareController from "./middleware";
import { CommonWorkerRouteIE } from "./routes";
import CommonWorkerRoutes from "./routes/item";

const expressController = (): http.Server => {
  const app: express.Application = createExpress();
  return createExpressServer(app);
};

const createExpress = (): express.Application => {
  const corsConfig = {
    // * subscribe servers origin
    origin: [env.SQS_SERVER_END_POINT],
    credentials: true,
  };

  const app: express.Application = express();

  app.use(cors(corsConfig));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, "public")));
  createRoute(app);

  return app;
};

const createRoute = (app: express.Application): void => {
  _.forEach(CommonWorkerRoutes, (CommonWorkerRoute: CommonWorkerRouteIE) => {
    app[CommonWorkerRoute.method](
      CommonWorkerRoute.path,
      middlewareController,
      async (req: Request, res: Response) => {
        const params = req.body.params ?? "";
        const action = req.route.path.replace("/", "");
        const result = await CommonWorkerRoute.next({
          action,
          params
        });

        res.status(200);
        res.send(result);
      },
    );
  });
};

const createExpressServer = (app: express.Application): http.Server => {
  const port = env.SUB_SCRIBE_A_SERVER_PORT;
  return app.listen(port, () => {
    console.log(`SUB_SCRIBE_A_SERVER_PORT ${port}`);
  });
};

export default expressController;
