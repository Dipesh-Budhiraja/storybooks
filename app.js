const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

//passport config
require('./config/passport')(passport);

//load routes
const auth = require('./routes/auth');

const app = express();

app.get('/', (req, res) => {
    res.send('It Works');
});

//use routes
app.use('/auth', auth);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server started on ${port}`);
});