import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from "connected-react-router";
import { generateContractsInitialState } from 'drizzle';
import { createBrowserHistory } from 'history'
import { DrizzleProvider } from 'drizzle-react';
import { Provider } from 'react-redux';
import {LoadingContainer} from 'drizzle-react-components';
import App from "./components/App";
import createRootReducer from './reducers';
import BagCount from "./contracts/BagCount.json";
import { configureStore } from 'redux-starter-kit'

//create the browser history to use with connected react router
const history = createBrowserHistory();

// let drizzle know what contracts we want and events to listen to
const options = { web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:8545'
    }
  },
  contracts: [BagCount], 
  polls: {
    accounts: 3000,
  },
  events: {
    BagCount: [ 
      'LogCenterDelivery', 'CheckDelivery', 'Discrepancy'
    ]
    } 
};

//create the state that represents the contract
const initialState = {
    contracts: generateContractsInitialState(options),
};

//set up the store w/connected router's reducer and the initial contract
const store = configureStore({
    reducer: createRootReducer(history),
    preloadedState: initialState
})

// pass in the drizzle instance and its options around the standard provider
//loading container won't let the app load if there's no web3 injection detected
ReactDOM.render((
  <DrizzleProvider options = {options} >
    <Provider store={store}>
      <LoadingContainer>
        <ConnectedRouter history={history} >
            <App history={history}/>            
        </ConnectedRouter>
      </LoadingContainer>
    </Provider>
  </DrizzleProvider>
), document.getElementById("root"));