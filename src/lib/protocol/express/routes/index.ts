export interface CommonWorkerRouteIE {
  path: string;
  method: "get" | "post" | "put" | "delete" | "patch";
  next: Function;
}
