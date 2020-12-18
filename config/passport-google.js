// Importing Modules
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const keys = require('./keys');
const crypto = require('crypto')

// Confrigation of strategy
passport.use(new GoogleStrategy({
        clientID: keys.GOOGLE_CLIENT_ID,
        clientSecret: keys.GOOGLE_CLIENT_SECRET,
        callbackURL: keys.GOOGLE_CALLBACK_URL
    },
    function (accessToken, refreshToken, profile, done) {
        User.findOne({
            email: profile.emails[0].value
        }).exec(function (error, user) {

            if (error) {
                console.error("ERROR: Passport- Google ", error);
            }
            console.log(profile);

            if (user) {
                return done(null, user);
            } else {
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    googleId: profile.id,
                    password: crypto.randomBytes(20).toString('hex')
                }, function (err, user) {
                    if (err) {
                        console.error("Error in creating user : ", err);
                    }
                    return done(null, user);
                })
            }
        })
    }
));

module.exports = passport