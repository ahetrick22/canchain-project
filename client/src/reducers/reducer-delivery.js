import { GET_DELIVERIES } from '../actions/types';

const INITIAL_STATE = {
  deliveries: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_DELIVERIES:
      return { ...state, deliveries: action.payload };
    default:
      return state;
  }
}
