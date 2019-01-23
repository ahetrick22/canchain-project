import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { drizzleReducers } from 'drizzle'
import authReducer from './reducer-auth'


export default (history) => combineReducers({
  router: connectRouter(history),
  authReducer,
  ...drizzleReducers
})