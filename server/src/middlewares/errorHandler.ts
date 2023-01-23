import { NextFunction, Request, Response } from "express";
import Blunder from "../utils/error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof Blunder) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(500).send({ message: err.message ?? "Internal Server Error" });
  }
};
