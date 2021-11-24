import errorController from "./lib/common/error";
import work from "./lib/worker";

(() => {
  try {
    work();
  } catch (error: any) {
    errorController(error);
  }
})();
