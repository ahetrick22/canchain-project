import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { drizzleReducers } from 'drizzle'
import authReducer from './reducer-auth'
import deliveryReducer from './reducer-delivery';
import fetchingReducer from './reducer-fetching';


export default (history) => combineReducers({
  router: connectRouter(history),
  authReducer,
  deliveryReducer,
  fetchingReducer,
  ...drizzleReducers
})