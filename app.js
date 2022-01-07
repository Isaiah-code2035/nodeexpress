const express = require('express');
const session = require('express-session');
const hbs = require('express-handlebars');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const urlencoded = require('express');
const Passport = require('passport');
const render = require('express/lib/response');
const app = express();

mongoose.connect("mongodb://localhost:27017/DB_USER", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//middleware
app.engine('hbs', hbs.engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(session({
    secret: "verygoodsecret",
    resave: false,
    saveUninitialized: true
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//const

//passport

app.use(Passport.initialize());
app.use(Passport.session());

Passport.serializeUser(function(user, done) {
    done(null, user.id)

});

Passport.deserializeUser(function(id, done) {
    user.findById(id, function(err, user) {
        done(err, user)
    })

});

Passport.use(new localStrategy(function(userName, password, done) {
    User.findOne({ username: username }, function(err, user) {
        if (err) { return done(err) }
        if (!user) {
            return done(null, false, { message: 'Incorrect Username' });

            bcrypt.compare(password, user.password, function(err, res) {
                if (err) { return done(err) };
                if (res === false) { return done(null, false, { message: "Incorrect Password." }) };
                return done(null, user)
            })

        }
    })

}));


app.get('/', (req, res) => {
    res.render("index", { title: "Home" })

})

app.listen(4000, () => {
    console.log("listening to port 4000")
})