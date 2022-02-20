import express from "express";

const middlewareController = (
  request: express.Request,
  response: express.Response,
  next: Function,
) => {
  next(request, response);
};

export default middlewareController;
