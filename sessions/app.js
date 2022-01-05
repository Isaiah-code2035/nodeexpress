const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const Router = require('./Routes')


const app = express();
//coennect to MongoDb

mongoose.connect('mongodb+srv://login:<Asiwaju@2035>@cluster0.z5p8s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }

);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function() {
    console.log("Connected successfully")
});

//use Middleware
app.use(Router)
app.use(morgan('combined'));
app.use(session({


}))
app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(4000, () => {
    console.log("Listening to server 4000")
})