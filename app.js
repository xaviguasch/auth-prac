const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')
const LocalStrategy = require('passport-local')
const passportLocalMongoose = require('passport-local-mongoose')
const User = require('./models/user')
mongoose.connect('mongodb://localhost:27017/auth_demo_app', { useNewUrlParser: true }) 

const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))
app.use(require('express-session')({
    secret: 'Xiti rules',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())



// ===============
// ROUTES
// ===============


app.get('/', function(req, res){
    res.render('home')
})

app.get('/secret', function(req, res){
    res.render('secret')
})



// Auth Router

// show sign up form
app.get('/register', function(req, res){
    res.render('register')
})
// handling user sign up
app.post('/register', function(req, res){
    req.body.username
    req.body.passport
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('register')
        } 
        passport.authenticate('local')(req, res, function(){
            res.redirect('/secret')
        })
    })
})



// LOGIN ROUTES
// render login form
app.get('/login', function(req, res){
    res.render('login')
})

// login logic
app.post('/login', passport.authenticate('local', {
    successRedirect: '/secret',
    failureRedirect: '/login'
}), function(req, res){
})



app.listen(3000, 'localhost', function() {
    console.log('Auth-demo server has started, listening on port 3000, you kiddo!!!');
})