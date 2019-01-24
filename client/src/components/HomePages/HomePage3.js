import React from 'react';

const HomePage3 = ({increasePageNum, decreasePageNum }) => {
  return (
  <div className ="container">
      <div className="main-class dashboard-page">
       <div className = "row">
         <div className="col ">
           <h1><strong>Welcome to CanChain!</strong></h1> 
            <p>Overwhelmed yet? It sure seems like this network could use some transparency...
            </p>      
              <button className="btn btn-sm btn-secondary" onClick={decreasePageNum}>What was that network again?</button>
              <button className = "btn btn-lg btn-primary" onClick={increasePageNum}>Let's zoom in</button>
         </div>
       </div>
      </div>
   </div>   
  )
}

export default HomePage3;
    