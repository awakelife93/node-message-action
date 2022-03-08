
import "module-alias/register";
import errorController from "./lib/common/error";
import work from "./lib/worker";

(async () => {
  try {
    await work();
  } catch (error: unknown) {
    errorController(error);
  }
})();
