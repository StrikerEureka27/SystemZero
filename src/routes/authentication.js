const express = require('express');
const router = express.Router();

const passport = require('passport')

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

router.get('/profile', (req, res)=> {
    res.render('profile.hbs')
})



module.exports = router;