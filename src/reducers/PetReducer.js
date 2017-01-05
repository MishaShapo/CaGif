import {
  UPDATE_WELLBEING_STATS,
  GET_WELLBEING_STATS,
  STORE_BUY,
  BACKPACK_PLACE
} from '../actions/types';

const INITIAL_STATE = {
  pawPoints: 0,
  happiness: 100,
  hunger: 100,
  health: 100
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
      const { key, price  } = action.payload;
      return {
        ...state,
        hunger: ( (key === 'smoothie') ? 30 : state.hunger + Math.round(Math.sqrt(price))),
        happiness: ((key === 'smoothie') ? 5 : state.happiness + 10),
        health: ((key === 'smoothie') ? 4 : state.health + 5)
      }
    }
    case UPDATE_WELLBEING_STATS: {
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
