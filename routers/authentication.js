const express = require('express');
const router = express.Router();
const passport = require('passport');
const authControllers = require('../controllers/auth_controllers');

// --------- Handel signup --------//
router.post('/signup', authControllers.create);

// --------- handel sign-in --------//
router.post('/login',
        passport.authenticate(
                'local', {
                        failureRedirect: '/signin'
                }
        ),
        authControllers.login
)
// ------- Sign Out -------//
router.get('/signout', authControllers.logout)


//--------- Reset Password -------//
router.post('/reset/:id', authControllers.resetPassword)



// -------- Google Authentication ---------//
router.get('/google', passport.authenticate('google', {
        scope: ['profile', 'email']
}))
router.get('/google/callback', passport.authenticate('google', {
        failureRedirect: '/login'
}), authControllers.login);

module.exports = router;