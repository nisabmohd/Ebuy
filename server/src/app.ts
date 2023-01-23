import express, { NextFunction, Request, Response } from "express";

import authRouter from "./routes/auth";
import productRouter from "./routes/product";
import { errorHandler } from "./middlewares/errorHandler";
const app = express();
import cors from "cors";
import { logger } from "./middlewares/logger";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

app.use(express.json());
app.use(cors());

app.use(logger);

app.get("/test", (req, res) => {
  res.send("Hello from server side");
});

app.use("/auth", authRouter);
app.use("/product", productRouter);

app.use(errorHandler);

export default app;
