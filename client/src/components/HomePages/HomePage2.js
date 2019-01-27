import React from 'react';

//informational component which is shown when page first loads (buttons allow cycling through Home Pages 1-5)
const HomePage2 = ({ increasePageNum, decreasePageNum }) => {
  return (
  <div className ="container">
      <div className="main-class dashboard-page">
       <div className = "row">
         <div className="col ">
         <strong><h1>A complex network...</h1> </strong>
            <p>Recycling in deposit states (like NY, MA, OR, and more):
            </p>
            <ul>
            <li><strong>Distributors</strong> send products to <strong>stores</strong> and pay deposits to <strong>recycling plants</strong></li>
              <hr />
              <li><strong>Stores</strong> pay deposits to <strong>distributors</strong> and sell to <strong>customers</strong></li>
              <hr />
              <li><strong>Customers</strong> pay deposits to <strong>stores</strong> for products and redeem items at <strong>redemption centers</strong> </li>
              <hr />
              <li><strong>Redemption centers</strong> pay incentives to <strong>customers</strong> and send product to <strong>recycling plants</strong></li>
              <hr />
              <li><strong>Recycling plants</strong> process recyclables and pay fees and bonuses to <strong>centers</strong></li>
              <hr />
              <li><strong>Government entities</strong> track this data and report it federally</li>
              </ul>
            <p>
              </p>        
              <button className = "btn btn-lg btn-primary" onClick={increasePageNum}>How about some transparency?</button>
              <button className = "btn btn-sm btn-secondary" onClick={decreasePageNum}>Wait, take me back</button>
         </div>
       </div>
      </div>
   </div>   
  )
}

export default HomePage2;
    