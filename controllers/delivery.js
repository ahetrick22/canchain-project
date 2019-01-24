const mysql = require('mysql');

const pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'recycling',
  password        : 'password',
  database        : 'recycling-project'
});

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

//get deliveries from all centers
exports.getDeliveries = (req, res) => {
  //send the unverified
 if(req.query.unverified) {
    pool.query(`SELECT deliveries.id AS delivery_id, deliveries.center_id AS center_id, 
    verified, discrepancy, date_time, contract_id, plant_count, center_count, name, city, state, account_address, username, account_type
    FROM deliveries JOIN users ON deliveries.center_id = users.id WHERE deliveries.verified=0 ORDER BY deliveries.date_time DESC`, (err, data) => {
      if (err) throw err;
      res.json(data);
    })
  //send the verified
  } else if (req.query.verified) {
    pool.query(`SELECT deliveries.id AS delivery_id, deliveries.center_id AS center_id, 
    verified, discrepancy, date_time, contract_id, plant_count, center_count, name, city, state, account_address, username, account_type
    FROM deliveries JOIN users ON deliveries.center_id = users.id WHERE deliveries.verified=1 ORDER BY deliveries.date_time DESC`, (err, data) => {
      if (err) throw err;
      res.json(data);
    })
  //send the ones with discrepancies
  } else if(req.query.discrepancy) {
    pool.query(`SELECT deliveries.id AS delivery_id, deliveries.center_id AS center_id, 
    verified, discrepancy, date_time, contract_id, plant_count, center_count, name, city, state, account_address, username, account_type
    FROM deliveries JOIN users ON deliveries.center_id = users.id WHERE deliveries.discrepancy > 0 ORDER BY deliveries.date_time DESC`, (err, data) => {
      if (err) throw err;
      res.json(data);
  })
}
  else {
      //send all of them
    pool.query(`SELECT deliveries.id AS delivery_id, deliveries.center_id AS center_id, 
    verified, discrepancy, date_time, contract_id, plant_count, center_count, name, city, state, account_address, username, account_type
    FROM deliveries JOIN users ON deliveries.center_id = users.id ORDER BY deliveries.date_time DESC`, (err, data) => {
      if (err) throw err;
      res.json(data);
    })
  }
}

//get deliveries from only a specific center
exports.getCenterDeliveries = (req, res) => {
  const { center } = req.params;
   //send the unverified
   if(req.query.unverified) {
    pool.query(`SELECT deliveries.id AS delivery_id, deliveries.center_id AS center_id, 
    verified, discrepancy, date_time, contract_id, plant_count, center_count, name, city, state, account_address, username, account_type
    FROM deliveries JOIN users ON deliveries.center_id = users.id WHERE deliveries.verified=0 AND center_id =${center} ORDER BY deliveries.date_time DESC`, (err, data) => {
      if (err) throw err;
      res.json(data);
    })
  //send the verified
  } else if (req.query.verified) {
    pool.query(`SELECT deliveries.id AS delivery_id, deliveries.center_id AS center_id, 
    verified, discrepancy, date_time, contract_id, plant_count, center_count, name, city, state, account_address, username, account_type
    FROM deliveries JOIN users ON deliveries.center_id = users.id WHERE deliveries.verified=1 AND center_id =${center} ORDER BY deliveries.date_time DESC`, (err, data) => {
      if (err) throw err;
      res.json(data);
    })
  //send the ones with discrepancies
  } else if(req.query.discrepancy) {
    pool.query(`SELECT deliveries.id AS delivery_id, deliveries.center_id AS center_id, 
    verified, discrepancy, date_time, contract_id, plant_count, center_count, name, city, state, account_address, username, account_type
    FROM deliveries JOIN users ON deliveries.center_id = users.id WHERE deliveries.discrepancy > 0 AND center_id =${center} ORDER BY deliveries.date_time DESC`, (err, data) => {
      if (err) throw err;
      res.json(data);
  })
}
  else {
      //send all of them
    pool.query(`SELECT deliveries.id AS delivery_id, deliveries.center_id AS center_id, 
    verified, discrepancy, date_time, contract_id, plant_count, center_count, name, city, state, account_address, username, account_type
    FROM deliveries JOIN users ON deliveries.center_id = users.id WHERE center_id =${center} ORDER BY deliveries.date_time DESC`, (err, data) => {
      if (err) throw err;
      res.json(data);
    })
  }
}