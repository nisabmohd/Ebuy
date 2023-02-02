import { RequestHandler } from "express";
import env from "../utils/envalid";

export const logger: RequestHandler = (req, res, next) => {
  if (!env.DEV) console.log(req.originalUrl);
  next();
};
