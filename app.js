const express = require('express')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/auth_demo_app', { useNewUrlParser: true }) 

const app = express()

app.set('view engine', 'ejs')

app.get('/', function(req, res){
    res.render('home')
})


app.get('/secret', function(req, res){
    res.render('secret')
})

app.listen(3000, 'localhost', function() {
    console.log('Auth-demo server has started, listening on port 3000, you kiddo!!!');
})