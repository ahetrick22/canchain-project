import { AUTH_USER, AUTH_ERROR } from '../actions/types';

const INITIAL_STATE = {
  user: null,
  errorMessage: '',
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
       return Object.assign({},state,{user: {...action.payload.user}})
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}
