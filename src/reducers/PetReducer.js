import {
  UPDATE_WELLBEING_STATS,
  STORE_BUY,
  CONSUME_ITEM,
  RESET_CHANGE_STATS
} from '../actions/types';

import inventory from '../data/inventory.json';

const INITIAL_STATE = {
  stats:{
    pawPoints: 200,
    health: 100,
    hunger: 100,
    mood: 100
  },
  statsChanges: {
    pawPoints: 0,
    health: 0,
    hunger: 0,
    mood: 0
  }

};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case STORE_BUY: {
      const { price } = action.payload;
      const newState = {
        ...state,
        stats:{
          ...state.stats,
          pawPoints: (state.stats.pawPoints - price)
        }
      };
      return newState;
    }
    case CONSUME_ITEM: {
      const newState = {...state};
      const { key } = action.payload;
      const { statsChanges } = inventory[key];
      console.log('PetReducer statsChanges : ', statsChanges);
      for( let stat in statsChanges){
        if(newState.stats[stat]){
          newState.statsChanges[stat] = ((statsChanges[stat] > 0) ? "+" : "-") + statsChanges[stat];
          newState.stats[stat] += statsChanges[stat];
        }
      }
      return newState;
    }
    case RESET_CHANGE_STATS: {
      const newState = {...state};
      for( let key in action.payload.stats){
        newState.statsChanges[key] = 0
      }
      return newState;
    }
    case UPDATE_WELLBEING_STATS: {
      const newState = {...state};
      for( let key in action.payload){
        newState.stats[key] = action.payload[key];
      }
      return newState;
    }

    default:
      return state;
  }
};
