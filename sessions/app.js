const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');



const app = express();
//coennect to MongoDb

app.use(morgan('combined'));
app.use(session({


}))
app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(4000, () => {
    console.log("Listening to server 4000")
})