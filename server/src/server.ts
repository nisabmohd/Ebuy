import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
const app = express();
dotenv.config();
import env from "./utils/envalid";
import mongoose from "mongoose";
const port = env.PORT;
import cors from "cors";
import authRouter from "./routes/auth";
import { errorHandler } from "./middlewares/errorHandler";

app.use(express.json());
app.use(cors());

app.get("/test", (req, res) => {
  res.send("Hello from server side");
});

app.use("/auth", authRouter);

app.use(errorHandler);

mongoose.set("strictQuery", true);
mongoose
  .connect(env.MONGO_URI)
  .then(() => {
    console.log("db connected");
    app.listen(port, () => {
      console.log("server running at port ", port);
    });
  })
  .catch((err) => {
    console.log(err);
  });
