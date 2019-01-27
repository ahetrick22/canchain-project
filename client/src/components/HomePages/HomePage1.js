import React from 'react';
import {Link} from 'react-router-dom';

//informational component which is shown when page first loads (buttons allow cycling through Home Pages 1-5)
const HomePage1 = ({ increasePageNum }) => {
  return (
    <div className="container">
      <div className="main-class dashboard-page">
        <div className="row">
          <div className="col">
            <strong>
              <h1>Welcome to
                <span className="logo"> CanChain</span>
              </h1>
            </strong>
            <p>CanChain uses the
              <a href="https://truffleframework.com/"> Truffle Suite </a>
              and
              <a href="https://metamask.io/"> Metamask </a>
              to interact with a private blockchain. It uses a recycling network as an example
              to demonstrate the capabilities.
            </p>
            <p>
              Transparency ------> Security
            </p>
          </div>
        </div>
        <button className="btn btn-lg btn-primary" onClick={increasePageNum}>Tell me More</button>
        <Link to="/login">
          <button className="btn btn-sm btn-secondary ">View the On-chain Demo</button>
        </Link>
        <a href="https://canchain.herokuapp.com">
          <button className="btn btn-sm btn-secondary">View the Off-chain Demo</button>
        </a>
      </div>
    </div>
  )
}
    
export default HomePage1;