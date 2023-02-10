import express, { NextFunction, Request, Response } from "express";

import authRouter from "./routes/auth";
import productRouter from "./routes/product";
import userRouter from "./routes/user";
import { errorHandler } from "./middlewares/errorHandler";
const app = express();
import cors from "cors";
import { logger } from "./middlewares/logger";
import env from "./utils/envalid";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

app.use(express.json());
app.use(cors());

if (!env.DEV) app.use(logger);

app.get("/test", (req, res) => {
  res.send("Hello from server side");
});

app.use("/auth", authRouter);
app.use("/product", productRouter);
app.use("/user", userRouter);

app.use(errorHandler);

export default app;
