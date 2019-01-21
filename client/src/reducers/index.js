import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { drizzleReducers } from 'drizzle'
import authReducer from './reducer-auth'
import userReducer from './reducer-user';


export default (history) => combineReducers({
  router: connectRouter(history),
  authReducer,
  userReducer,
  ...drizzleReducers
})