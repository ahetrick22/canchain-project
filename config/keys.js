require('dotenv').config();

if (process.env.NODE_ENV === 'production') {
  // we are in production - return the prod set of keys
  module.exports = {
    TOKEN_SECRET: process.env.COOKIE_KEY,
    SQLCONNLIMIT: 0,
    SQLHOST: '',
    SQLUSERNAME: '',
    SQLPASSWORD: '',
    SQLSCHEMA: ''
  }
} else {
  // we are in development - return the dev keys
  module.exports = {
    TOKEN_SECRET: 'sadfqwt547utrusdf',
    SQLCONNLIMIT: 10,
    SQLHOST: 'localhost',
    SQLUSERNAME: 'recycling',
    SQLPASSWORD: 'password',
    SQLSCHEMA: 'recycling-project'
  }
}