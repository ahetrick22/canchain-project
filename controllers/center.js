const mysql = require('mysql');
const keys = require('../config/keys')

const pool  = mysql.createPool({
  connectionLimit : keys.SQLCONNLIMIT,
  host            : keys.SQLHOST,
  user            : keys.SQLUSERNAME,
  password        : keys.SQLPASSWORD,
  database        : keys.SQLSCHEMA
});

//get all centers
exports.getCenters = (req, res, next) => {
  pool.query(`SELECT id, name FROM users WHERE account_type='Center'`, (err, centers) => {
    if (err) throw err;
    res.json(centers);
  })
}