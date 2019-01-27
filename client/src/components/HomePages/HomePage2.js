import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faTruck, faCartPlus, faUsers, faRecycle, faBuilding, faChartPie } from '@fortawesome/free-solid-svg-icons';

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
              <hr className="half-width" />
              <FontAwesomeIcon icon={faTruck} className='divider-icon'/>
              <hr className="half-width" />
              <li><strong>Stores</strong> pay deposits to <strong>distributors</strong> and sell to <strong>customers</strong></li>
              <hr className="half-width" />
              <FontAwesomeIcon icon={faCartPlus} className='divider-icon'/>
              <hr className="half-width" />
              <li><strong>Customers</strong> pay deposits to <strong>stores</strong> for products and redeem items at <strong>redemption centers</strong> </li>
              <hr className="half-width" />
              <FontAwesomeIcon icon={faUsers} className='divider-icon'/>
              <hr className="half-width" />
              <li><strong>Redemption centers</strong> pay incentives to <strong>customers</strong> and send product to <strong>recycling plants</strong></li>
              <hr className="half-width" />
              <FontAwesomeIcon icon={faRecycle} className='divider-icon'/>
              <hr className="half-width" />
              <li><strong>Recycling plants</strong> process recyclables and pay fees and bonuses to <strong>centers</strong></li>
              <hr className="half-width" />
              <FontAwesomeIcon icon={faBuilding} className='divider-icon'/>
              <hr className="half-width" />
              <li><strong>Government entities</strong> track this data and report it federally</li>
              <hr className="half-width" />
              <FontAwesomeIcon icon={faChartPie} className='divider-icon'/>
              <hr className="half-width" />
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
    