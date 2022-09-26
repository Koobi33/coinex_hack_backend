const express = require('express');
const bodyParser = require("body-parser");

const { connectDataBase } = require('./db-connect');
const { PORT, HOST } = require('./constants');
const router = require('./routes/index');

// App
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', router);


// DataBase
connectDataBase().then(() => {
    console.log("CONNECTED");
    console.log('User db created | synced');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
