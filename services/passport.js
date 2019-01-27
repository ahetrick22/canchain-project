const passport = require('passport')
const ExtractJwt = require('passport-jwt').ExtractJwt
const JwtStrategy = require('passport-jwt').Strategy
const LocalStrategy = require('passport-local')
const crypto = require('crypto');
const mysql = require('mysql');
const keys = require('../config/keys');

const pool  = mysql.createPool({
  connectionLimit : keys.SQLCONNLIMIT,
  host            : keys.SQLHOST,
  user            : keys.SQLUSERNAME,
  password        : keys.SQLPASSWORD,
  database        : keys.SQLSCHEMA
});

//make sure the user's password is valid
const validPassword = (password, salt, userHash) => {
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return userHash == hash;
}

// Create local strategy
const localLogin = new LocalStrategy((username, password, done) => {
  // Verify this username and password, call done with the user
  // if it is the correct email and password
  // otherwise, call done with false
  pool.query(`SELECT * FROM users WHERE \`username\` = '${username}'`, (err, user) => {
    if (err) { return done(err); }
    if (user.length === 0) { return done(null, false) }
    if (!validPassword(password, user[0].salt, user[0].hash)) {
      return done(null, false, { message: 'Incorrect password.' })
    }
    return done(null, user);
  })
})

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.TOKEN_SECRET
}

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  // See if the user ID in the payload exists in our database
  // If it does, call 'done' with that other
  // otherwise, call done without a user object
 pool.query(`SELECT * FROM users WHERE id='${payload.sub}'`, (err, user) => {
    if (err) { return done(err, false) }
    if (user) {
      done(null, user)
    } else {
      done(null, false)
    }
  })
})

// Tell passport to use this strategy
passport.use(jwtLogin)
passport.use(localLogin)
