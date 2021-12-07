import work from "./lib/worker";

(async () => {
  try {
    await work();
  } catch (error: any) {
    console.log(error);
  }
})();
