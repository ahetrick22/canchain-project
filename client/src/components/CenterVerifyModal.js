import React from 'react';
const moment = require('moment');

const CenterVerifyModal= props => {
  const {centerAddress,
    centerCount,
    centerDt,
    centerBn,
  } = props;

  return (
    <>
            <label>Center Address: </label>
            {centerAddress}
            <br/>
            <label>Plant Address: </label>
            N/A
            <br/>
            <label>Center Count: </label>
            Verify delivery to view
            <br/>
            <label>Plant Count: </label>
            N/A
            <br/>
            <label>Center Date/Time: </label>
            {moment.unix(centerDt).format('MMMM Do YYYY hh:MM a')}
            <br/>
            <label>Plant Date/Time: </label>
            N/A
            <br/>
            <label>Center Block Number: </label>
            {centerBn}
            <br/>
            <label>Plant Block Number: </label>
            N/A
            <br/>
            <label>Database Discrepancy: </label>
            N/A
            <br/>
            <label>Chain Discrepancy: </label>
            N/A
            <br/>
            <p>Discrepancy cannot be calculated before plant verification of delivery.</p>
       
      </>
  )
}

export default CenterVerifyModal;