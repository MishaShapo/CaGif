import {
  STORE_FETCH_SUCCESS,
} from '../actions/types';

const INTIAL_STATE = {};

export default (state = INTIAL_STATE, action ) => {
  switch(action.type){
    case STORE_FETCH_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
