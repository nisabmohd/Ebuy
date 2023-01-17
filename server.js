const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
app.use(cors());
app.use(express.json());
const authRouter = require("./routers/auth");

app.get("/test", (req, res) => {
  res.send("Hello from server side");
});

app.use("/auth", authRouter);

app.listen(process.env.PORT || 8000, () => {
  console.log("running on port ", process.env.PORT || 8000);
});
