const mysql = require('mysql');

const pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'recycling',
  password        : 'password',
  database        : 'recycling-project'
});

//get all centers
exports.getCenters = (req, res, next) => {
  pool.query(`SELECT id, name FROM users WHERE account_type='Center'`, (err, centers) => {
    if (err) throw err;
    res.json(centers);
  })
}