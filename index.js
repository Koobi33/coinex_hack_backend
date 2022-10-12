const fs = require("fs");
const https = require("https");
const privateKey = fs.readFileSync("./certs/private.key", "utf8");
const certificate = fs.readFileSync("./certs/certificate.crt", "utf8");

const credentials = { key: privateKey, cert: certificate };

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

const httpsServer = https.createServer(credentials, app);
httpsServer.listen(PORT);
console.log(`Running on http://${HOST}:${PORT}`);
