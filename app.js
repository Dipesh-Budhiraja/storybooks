const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.get('/', (req, res) => {
    res.send('It Works');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server started on ${port}`);
});