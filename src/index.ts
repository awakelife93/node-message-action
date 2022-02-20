import work from "./lib/worker";

(async () => {
  try {
    await work();
  } catch (error: unknown) {
    console.log(error);
  }
})();
