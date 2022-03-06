export type CommonWorkerRouteType = {
  path: string;
  method: "get" | "post" | "put" | "delete" | "patch";
};
const CommonWorkerRoutes: CommonWorkerRouteType[] = [
  {
    path: "/deleteUserToken",
    method: "post",
  },
];

export default CommonWorkerRoutes;
