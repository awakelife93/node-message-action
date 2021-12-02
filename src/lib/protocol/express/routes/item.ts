import { CommonWorkerRouteIE } from ".";
import { CommonAction } from "../../../action";

const CommonWorkerRoutes: CommonWorkerRouteIE[] = [
  {
    path: "/deleteUserToken",
    method: "post",
    next: CommonAction.deleteUserToken,
  },
];

export default CommonWorkerRoutes;
