const jwt = require('jwt-simple')
const mysql = require('mysql');
const keys = require('../config/keys');
var crypto = require('crypto');

const pool  = mysql.createPool({
  connectionLimit : keys.SQLCONNLIMIT,
  host            : keys.SQLHOST,
  user            : keys.SQLUSERNAME,
  password        : keys.SQLPASSWORD,
  database        : keys.SQLSCHEMA
});

//builds a token for use in local storage
const tokenForUser = user => {
  return jwt.encode({ sub: user[0].id,
    iat: Math.round(Date.now() / 1000),
    exp: Math.round(Date.now() / 1000 + 5 * 60 * 60)}, keys.TOKEN_SECRET)
}

//creates the salt and hash for a user's password
const setPassword = password => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return { salt, hash };
}


exports.signin = (req, res, next) => {
  // User has already had their username and password auth'd
  // We just need to give them a token
  res.json({
    token: tokenForUser(req.user),
    user: req.user[0]
  })
}

exports.signup = async (req, res, next) => {
  const { username, password, centerName, city, state, accountAddress, contactName, accountType } = req.body;
  if (!username || !password) {
    return res.status(422).send({ error: 'You must provide username and password'})
  }

  // See if a user with the given email exists
  await pool.query(`SELECT * FROM users WHERE \`username\`='${username}'`, function(err, existingUser) {
    if (err) { return next(err) }

    // If a user with email does exist, return an error
    if (existingUser.length !== 0) {
      return res.status(422).send({ error: 'Username is in use' })
    }
  })

  const { salt, hash } = await setPassword(password);
  // If a user with username does NOT exist, create and save user record
  await pool.query(`INSERT INTO users(
    \`username\`, \`name\`, \`city\`,\`state\`,\`contact_full_name\`,\`account_address\`, \`account_type\`, \`salt\`, \`hash\`)
    VALUES
    ('${username}', '${centerName}', '${city}', '${state}', '${contactName}', '${accountAddress}', '${accountType}', '${salt}', '${hash}')`, async (err, user) => {
      if (err) { 
        return next(err) 
      }
      //must get the full user so that we can use the ID to create a token
      await pool.query(`SELECT * FROM users WHERE \`username\`='${username}'`, function(err, foundUser) {
        if (err) { 
          return next(err) 
        }
       res.json({ token: tokenForUser(foundUser) })
      })
  })
}

