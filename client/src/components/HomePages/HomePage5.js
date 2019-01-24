import React from 'react';

const HomePage5 = ({increasePageNum, decreasePageNum}) => {
  return (
  <div className ="container">
      <div className="main-class dashboard-page">
       <div className = "row">
         <div className="col ">
         <strong><h1>An Ethereum blockchain</h1></strong> 
            <p>Let's distribute the bag count data across nodes running an Ethereum blockchain. </p>
            <hr />
            <p><strong>Plants</strong> and <strong>centers</strong> submit their 
              counts based on delivery IDs.</p>
              <hr />
              <p> Discrepancies are easily identified, and there is a tamper-proof record of all counts, 
              plus a database to analyze data over time.
            </p>
      
              <button className="btn btn-sm btn-secondary" onClick={decreasePageNum}>What was that about bag counts?</button>
              <button className = "btn btn-lg btn-primary" onClick={increasePageNum}>Sounds great!</button>

         </div>
       </div>
      </div>
   </div>   
  )
}

export default HomePage5;
    