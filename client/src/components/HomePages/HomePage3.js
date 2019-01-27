import React from 'react';

//informational component which is shown when page first loads (buttons allow cycling through Home Pages 1-5)
const HomePage3 = ({increasePageNum, decreasePageNum }) => {
  return (
  <div className ="container">
      <div className="main-class dashboard-page">
       <div className = "row">
         <div className="col ">
         <strong><h1>Let's zoom in...</h1> </strong>
            <p><strong>Redemption centers</strong> bag items with a set count per bag, then send a trailer of bags to a <strong>plant</strong>. They are incentivized to report high bag counts because they get paid by the bag.
            </p>
            <hr />
            <p>
              <strong>Plants</strong> receive and count bags from <strong>redemption centers</strong>. They are incentivized to report low bag counts because they have to pay out less, but still profit from the scrap.
              </p>        
              <button className = "btn btn-lg btn-primary" onClick={increasePageNum} >Ok, so what?</button>
              <button className="btn btn-sm btn-secondary" onClick={decreasePageNum} >Zoom back out</button>
         </div>
       </div>
      </div>
   </div>   
  )
}

export default HomePage3;
    