const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

// Register route
router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    try {
        const { username, password, gender, aadharNumber, age, address } = req.body;
        const user = new User({ username, gender, aadharNumber, age, address });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            res.redirect('/bats');
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
});

// Login route
router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/login'
}), (req, res) => {
    res.redirect('/bats');
});

// Logout route
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router; 