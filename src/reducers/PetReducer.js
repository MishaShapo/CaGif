import {
  UPDATE_WELLBEING_STATS,
  STORE_BUY,
  CONSUME_ITEM,
  RESET_CHANGE_STATS,
  CASH_IN_STEPS,
  UPDATE_STEP_COUNT
} from '../actions/types';

import inventory from '../data/inventory.json';

const INITIAL_STATE = {
  stats:{
    pawPoints: 300,
    health: 100,
    hunger: 100,
    mood: 100
  },
  statsChanges: {
    pawPoints: 0,
    health: 0,
    hunger: 0,
    mood: 0
  },
  steps: {
    count: 0,
    cashedIn: 0,
    lastDayCashedIn: Date.now() / (1000 * 60 * 60 * 24) // ms, sec, min, hour = days
  }
};

/*
Process for managing steps + pawPoints =

count: steps walked in the current day,
cashedIn: how many steps of today have already been cashed in
lastDayCashedIn: last day when steps were cashed in for money

if(lastDayCashedIn !== today){
  cashedIn = 0;
}
if(count > cashedIn){
  pawPoints += (count - cashedIn);
  cashedIn = count
  lastDayCashedIn = today;
}

*/

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
      for( let stat in statsChanges){
        if(newState.stats[stat]){
          newState.statsChanges[stat] = ((statsChanges[stat] > 0) ? "+" : "") + statsChanges[stat];
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
    case CASH_IN_STEPS: {
      const newState = {...state};
      const today = Date.now() / (1000 * 60 * 60 * 24); // ms, sec,
      let { lastDayCashedIn, cashedIn, count} = newState.steps;
      if(lastDayCashedIn !== today){
        cashedIn = 0;
      }
      if(count > cashedIn){
        newState.stats.pawPoints += (count - cashedIn);
        newState.statsChanges.pawPoints = (((count - cashedIn) > 0) ? "+" : "") + (count - cashedIn);
        cashedIn = count;
        lastDayCashedIn = today;
      }
      newState.steps.cashedIn = cashedIn;
      newState.steps.lastDayCashedIn = lastDayCashedIn;
      return newState;
    }
    case UPDATE_STEP_COUNT: {
      const newState = {...state};
      newState.steps.count = action.payload;
      return newState;
    }
    default:
      return state;
  }
};
