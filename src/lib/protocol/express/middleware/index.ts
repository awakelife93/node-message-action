const middlewareController = (
  req: Express.Request,
  res: Express.Response,
  next: Function,
) => {
  next(req, res);
};

export default middlewareController;
