const express = require('express');
const {connectDataBase, User} = require('./db-connect');
const { PORT, HOST } = require('./constants');


// App
const app = express();


// DataBase
connectDataBase().then(() => {
    console.log("CONNECTED");
    console.log('User db created | synced');
});


// methods
app.get('/', async (req, res) => {
    const allUsers = await User.findAll()
    res.send(`All users: ${JSON.stringify(allUsers)}`);
});

app.get('/create', async (req, res) => {
    const name = `User name #${Math.random()}`
    await User.create({ firstName: name, lastName: name })
    res.send(`User ${name} has been created`);
});



app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
