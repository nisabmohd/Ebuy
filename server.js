const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  res.send("Hello from server side");
});

app.listen(process.env.PORT || 8000, () => {
  console.log("running on port ", process.env.PORT || 8000);
});

function log(msg) {
  console.log(msg);
}
log("hello");
