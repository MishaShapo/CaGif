import {
  UPDATE_WELLBEING_STATS,
  STORE_BUY,
  BACKPACK_PLACE
} from '../actions/types';

const INITIAL_STATE = {
  pawPoints: 2000,
  health: 100,
  hunger: 100,
  mood: 100
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case STORE_BUY: {
      const { price } = action.payload;
      return {
        ...state,
        pawPoints: (state.pawPoints - price)
      }
    }
    case BACKPACK_PLACE: {
      // const { key, price  } = action.payload;
      return {
        ...state
      }
    }
    case UPDATE_WELLBEING_STATS: {
      const newState = {...state};
      for( let key in action.payload){
        newState[key] = action.payload[key];
      }
      return newState;
    }
    default:
      return state;
  }
};
