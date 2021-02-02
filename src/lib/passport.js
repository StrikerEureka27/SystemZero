const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const db = require('../database.js');
const helpers = require('./helpers');

passport.use('login', new LocalStrategy({
    usernameField: 'userName', 
    passwordField: 'password', 
    passReqToCallback: true
}, async (req, username, password, done) => {
    const registro = await db.query('SELECT * FROM users WHERE username = ? ', [username]);
    if(registro.length>0){
        const user = registro[0];
        const validPassword = await helpers.matchPassword(password, user.password);
        console.log(validPassword);
        if(validPassword){
            done(null, user, req.flash('success' + user.username));
        }else{
            done(null, false, req.flash('message', 'Incorrect password to ' + user.username))
            
        }
    }else{
        done(null, false, req.flash('message', 'The username does not exist'))
    }


}));


passport.use('local', new LocalStrategy({
    usernameField: 'userName', 
    passwordField: 'password', 
    passReqToCallback: true
}, async (req, username, password, done) => {
    const { fullName } = req.body;
    const data = {
        username, 
        password, 
        fullName
    };
    data.password = await helpers.encryptPassword(password);
    const result = await db.query('INSERT INTO users SET ?', [data]);
    data.id = result.insertId;
    return done(null, data)
}));



passport.serializeUser(function(user, done) {
    done(null, user.id);
  });


  passport.deserializeUser(async (id, done) => {
    try {
      let user = await db.query('SELECT * FROM users WHERE id =?', [id]);
      if (user.length>0) {
        done(null, user[0]);
      }else{
        return done(new Error('user not found'));
      }
      
    } catch (e) {
      done(e);
    }
  });