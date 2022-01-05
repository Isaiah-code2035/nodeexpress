const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')


const app = express();

app.use(morgan('combined'));

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(4000, () => {
    console.log("Listening to server 4000")
})