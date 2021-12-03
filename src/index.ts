import errorController from "./lib/common/error";
import work from "./lib/worker";

(async () => {
  try {
    await work();
  } catch (error: any) {
    errorController(error);
  }
})();
