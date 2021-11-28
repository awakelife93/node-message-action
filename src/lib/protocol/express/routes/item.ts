import { CommonWorkerRouteIE } from ".";

const CommonWorkerRoutes: CommonWorkerRouteIE[] = [
  {
    path: "/deleteUserToken",
    method: "post",
    next: deleteUserToken,
  },
];

export default CommonWorkerRoutes;
