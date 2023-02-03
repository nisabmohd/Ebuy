import dotenv from "dotenv";
dotenv.config();
import env from "./utils/envalid";
import mongoose from "mongoose";
import server from "./app";
const port = env.PORT;

mongoose.set("strictQuery", true);
mongoose
  .connect(env.MONGO_URI)
  .then(() => {
    console.log("db connected");
    return server.listen(port);
  })
  .then(() => {
    console.log("server running at port ", port);
  })
  .catch((err) => {
    console.log(err);
  });
