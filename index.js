const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectDataBase, sequelize } = require("./db-connect");

const { PORT, HOST } = require("./constants");
const router = require("./routes/index");
const authRouter = require("./routes/auth");

// App
const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/api", router);
app.use("/auth", authRouter);

// DataBase
connectDataBase().then(() => {
  sequelize.sync().then(() => {
    console.log("all db created | synced");
  });
  // User.sync().then(() => {
  //   console.log("User db created | synced");
  // });
  // Course.sync().then(() => {
  //   console.log("Course db created | synced");
  // });
  console.log("CONNECTED");
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
