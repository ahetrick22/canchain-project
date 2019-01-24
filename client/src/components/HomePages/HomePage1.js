import React from 'react';

const HomePage1 = ({increasePageNum}) => {
  return (
  <div className ="container">
      <div className="main-class dashboard-page">
       <div className = "row">
         <div className="col ">
         <strong><h1>Welcome to <span className="logo">CanChain</span></h1></strong>
            <p>CanChain uses the <a href="https://truffleframework.com/">Truffle Suite</a> and <a href="https://metamask.io/">Metamask</a> to interact with a private blockchain. 
              It uses a recycling network as an example to demonstrate the capabilities.
            </p>
            <p>
              Lack of Trust ------> Transparency ------> Security
              </p>        
              <a href="https://github.com/ahetrick22/canchain-project"><button className="btn btn-sm btn-secondary">View the On-chain Source Code</button></a>
              <button className = "btn btn-lg btn-primary" onClick={increasePageNum}>Tell me More</button>
              <button className="btn btn-sm btn-secondary">View the Off-chain Demo</button>
         </div>
       </div>
      </div>
   </div>   
  )
}

export default HomePage1;
    