import React from 'react';
const moment = require('moment');


const PlantVerifyModal = props => {
  const {centerAddress,
    plantAddress,
    centerCount,
    plantCount,
    centerDt,
    plantDt,
    centerBn,
    plantBn,
    chainDiscrepancy,
    dbDiscrepancy
  } = props;

  return (
    <>
      {dbDiscrepancy === 0 ? <><div className="green-circle"></div><span>  No discrepancy in database.</span><br/></> : 
       <><div className="red-circle"></div><span>  Discrepancy identified in database.</span><br /></>}
       {chainDiscrepancy-dbDiscrepancy === 0 ? <><div className="green-circle"></div><span>  Chain record matches database: any discrepancy is due to human error.</span><br/></> : 
            <><div className="red-circle"></div><span>  Chain record does not match database: database is untrustworthy.</span><br /></>}
            <label>Center Address: </label>
            {centerAddress}
            <br/>
            <label>Plant Address: </label>
            {plantAddress}
            <br/>
            <label>Center Count: </label>
            {centerCount}
            <br/>
            <label>Plant Count: </label>
            {plantCount}
            <br/>
            <label>Center Date/Time: </label>
            {moment.unix(centerDt).format('MMMM Do YYYY hh:MM a')}
            <br/>
            <label>Plant Date/Time: </label>
            {moment.unix(plantDt).format('MMMM Do YYYY hh:MM a')}
            <br/>
            <label>Center Block Number: </label>
            {centerBn}
            <br/>
            <label>Plant Block Number: </label>
            {plantBn}
            <br/>
            <label>Database Discrepancy: </label>
            {dbDiscrepancy}
            <br/>
            <label>Chain Discrepancy: </label>
            {chainDiscrepancy}
            <br/>
      </>
    );
}

export default PlantVerifyModal;