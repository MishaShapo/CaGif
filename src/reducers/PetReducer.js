import {
  UPDATE_WELLBEING_STAT,
  GET_WELLBEING_STATS
} from '../actions/types';

const INITIAL_STATE = {
  pawPoints: 0,
  happiness: 100,
  hunger: 100,
  health: 100
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case UPDATE_WELLBEING_STAT: {
      const newState = {...state};
      for( let key in action.payload){
        newState[key] = action.payload[key];
      }
      return newState;
    }
    case GET_WELLBEING_STATS:
    default:
      return state;
  }
};
