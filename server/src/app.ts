import express, { NextFunction, Request, Response } from "express";

import authRouter from "./routes/auth";
import { errorHandler } from "./middlewares/errorHandler";
const app = express();
import cors from "cors";

app.use(express.json());
app.use(cors());

app.get("/test", (req, res) => {
  res.send("Hello from server side");
});

app.use("/auth", authRouter);

app.use(errorHandler);

export default app;
