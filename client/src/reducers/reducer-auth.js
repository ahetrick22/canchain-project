import { AUTH_USER, AUTH_ERROR } from '../actions/types';

const INITIAL_STATE = {
  user: null,
  errorMessage: '',
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
    console.log('state in auth reducer',state);
    console.log('user in action', action.payload.user)
    console.log('assigning object', Object.assign({},state,{user: {...action.payload.user}}))
      return Object.assign({},state,{user: {...action.payload.user}})
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}
