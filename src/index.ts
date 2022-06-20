import "module-alias/register";
import errorController from "./common/error";
import work from "./worker";

(async () => {
  try {
    await work();
  } catch (error: unknown) {
    errorController(error);
  }
})();
