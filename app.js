const express = require('express');
const session = require('express-session');
const expresshbs = require('express-handlebars');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { Mongoose } = require('mongoose');
const app = express();

Mongoose.connect("mongodb://localhost:27017/node-auth-yt", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//middleware
app.engine('hbs', hbs({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(session({
    secret: "verygoodsecret",
    resave: false,
    saveUninitialized: true;
}))









app.get('/', (req, res) => {

})

app.listen(4000, () => {
    console.log("listening to port 4000")
})