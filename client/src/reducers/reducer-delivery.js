import { GET_DELIVERIES, SET_PARAMS } from '../actions/types';

const INITIAL_STATE = {
  deliveries: [],
  paramStr: ''
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_DELIVERIES:
      return { ...state, deliveries: action.payload };
    case SET_PARAMS:
      return {...state, paramStr: action.payload}
    default:
      return state;
  }
}
