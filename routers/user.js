//----- Importing Modules-------//
const express = require('express');
const routers = express.Router();
const passport = require('passport');

// view for home page
routers.get('/', passport.checkSessionPresent ,function (req, res) {
    return res.render('index.html');
})

// view for sign in page
routers.get('/signin', function (req, res) {

    if (req.isAuthenticated()) {
        return res.redirect('/user')
    }
    return res.render('signin');
})

//view for sign up page
routers.get('/signup', function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/user')
    }
    return res.render('signup');
})

//view for user info page
routers.get('/user', passport.checkAuthentication, function (req, res) {
    return res.render('user');
})

//view for user
routers.get('/reset', passport.checkAuthentication, function (req, res) {
    return res.render('reset');
})

module.exports = routers;