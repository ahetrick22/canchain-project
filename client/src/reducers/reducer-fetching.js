import { FETCHING_DATA } from '../actions/types';

const INITIAL_STATE = {
  isFetching: false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCHING_DATA:
      return { ...state, isFetching: !state.isFetching
        };
    default:
      return state;
  }
}
