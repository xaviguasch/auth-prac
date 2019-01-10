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

app.use(require('express-session')({
    secret: 'Xiti rules',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


app.get('/', function(req, res){
    res.render('home')
})


app.get('/secret', function(req, res){
    res.render('secret')
})

app.listen(3000, 'localhost', function() {
    console.log('Auth-demo server has started, listening on port 3000, you kiddo!!!');
})