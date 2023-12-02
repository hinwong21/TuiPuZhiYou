import express from "express";
import { errorHandler } from "./error";

export const isLoggedInAPI = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    if (!req.session.isLogin) {
      throw new Error("No permission to access this API");
    } else {
      next();
    }
  } catch (err) {
    errorHandler(err, req, res);
  }
};
