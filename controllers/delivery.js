const mysql = require('mysql');

const pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'recycling',
  password        : 'password',
  database        : 'recycling-project'
});

exports.getCenterDeliveries = (req, res) => {
  const { center } = req.params;
  pool.query(`SELECT * FROM deliveries WHERE \`center_id\`='${center}'`, (err, data) => {
    if (err) throw err;
    res.json(data);
  })
}

//add a new delivery from a center
exports.addDelivery = (req, res, next) => {
  const { centerId, contractId, centerCount } = req.body;
  pool.query(`INSERT INTO deliveries(
    \`center_id\`, \`contract_id\`, \`center_count\`) 
    VALUES
    ('${centerId}', '${contractId}', '${centerCount}')`, (err, delivery) => {
      if (err) { return next(err) }
      res.send({ contractId });
    })
}

exports.verifyDelivery = (req, res, next) => {
  const { contract_id, discrepancy, plantCount } = req.body;
  pool.query(`UPDATE deliveries SET 
  \`discrepancy\`='${discrepancy}', 
  \`verified\`=true, \`plant_count\`='${plantCount}'
    WHERE \`contract_id\`='${contract_id}'`, (err, data) => {
      pool.query(`SELECT * FROM deliveries WHERE \`contract_id\`='${contract_id}'`, (err, updatedDelivery) => {
        res.send(updatedDelivery);
      })
    })
}

//get all unverified deliveries for the plant to verify them
exports.getUnverifiedDeliveries = (req, res) => {
pool.query(`SELECT * FROM deliveries WHERE \`verified\`= 0`, (err, data) => {
    if (err) throw err;
    //console.log(data);
    res.json(data);
  })
}