import { CommonWorkerRouteIE } from ".";
import actionController from "../../../action";

const CommonWorkerRoutes: CommonWorkerRouteIE[] = [
  {
    path: "/deleteUserToken",
    method: "post",
    next: actionController,
  },
];

export default CommonWorkerRoutes;
