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
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('user', UserSchema);


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

Passport.serializeUser(function(User, done) {
    done(null, User.id)

});

Passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, User) {
        done(err, User)
    })

});

Passport.use(new localStrategy(function(username, password, done) {
    User.findOne({ username: username }, function(err, User) {
        if (err) { return done(err) }
        if (!User) {
            return done(null, false, { message: 'Incorrect Username' });

        };

        bcrypt.compare(password, User.password, function(err, res) {
            if (err) { return done(err) };
            if (res === false) { return done(null, false, { message: "Incorrect Password." }) };
            return done(null, User)
        });
    })

}));

function isLoggedin(req, res, next) {
    if (req.isAuthenticated()) {
        return next()

    } else {
        res.redirect('/login')

    }

}


function isLoggedout(req, res, next) {
    if (!req.isAuthenticated()) {
        return next()

    } else {
        res.redirect('/')

    }

}


//routes
app.get('/', isLoggedin, (req, res) => {
    res.render("index", { title: "Home" })

});

app.get('/login', isLoggedout, (req, res) => {
    const response = {
        title: "Login",
        error: req.query.error
    }

    res.render("Login", response)
});

app.post('/login', Passport.authenticate('local', {
    successRedirect: '/login',
    failRedirect: '/login?error=true'
}));

app.get('/logout', (req, res) => {

    req.logout();
    res.redirect('/');
});

app.get('/setup', async function(req, res, next) {
    const exists = await User.exists({ username: "admin" });

    if (exists) {
        console.log("exists")
        res.redirect('/login');
        return;
    };

    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return next(err);

        }

        bcrypt.hash("pass", salt, function(err, hash) {
            if (err) {
                return next(err);

            }

            const newAdmin = new User({
                username: 'admin',
                password: hash
            });

            newAdmin.save();
            res.redirect('/login')
        });
    })

})



app.listen(4000, () => {
    console.log("listening to port 4000")
})