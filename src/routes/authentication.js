const express = require('express');
const router = express.Router();

const passport = require('passport')
const { isLoggedIn } = require('../lib/auth.js');

router.get('/signup', (req, res)=>{
    res.render('auth/signup');
})

router.post('/signup', passport.authenticate('local', {
        successRedirect: '/', 
        failureRedirect: '/fail',
        failureFlash: true
    })
)

router.get('/login', (req, res) => {
    res.render('auth/login.hbs');
})

router.post('/login', passport.authenticate('login', {
        successRedirect: '/profile', 
        failureRedirect: '/login',
        failureFlash: true
    }) 
)

router.get('/profile',isLoggedIn, (req, res)=> {
    res.render('profile.hbs')
})

router.get('/logout', (req, res)=>{
    req.logOut();
    res.redirect('/login');
})


module.exports = router;