const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const db = require('../database/connect');
const utils = require('../utils/utils');

const router = express.Router();

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new LocalStrategy({
  usernameField: 'id',
  passwordField: 'password',
  session: true,
}, async (id, password, done) => {
  const user = db.user.findByID(id);

  if (!utils.isEmpty(user)) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const { id, name } = user;
      return done(null, { id, name });
    }
  }
  return done(null, false, { message: "Wrong User" });
}));

router.post('/login',
  passport.authenticate('local'),
  (req, res) => {
    res.json(utils.successTrue(req.user));
  });

router.post('/logout', (req, res) => {
  req.logout();
  res.json(utils.successTrue({}));
});

module.exports = router;