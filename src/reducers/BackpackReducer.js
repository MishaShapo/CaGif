import cloneDeep from 'lodash/cloneDeep';
import {Dimensions} from 'react-native';

import {
  STORE_BUY,
  BACKPACK_PLACE,
  CONSUME_ITEM,
  RESET_GAME
} from '../actions/types';
const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  const {width, height} = Dimensions.get('window');
  switch(action.type){
    case STORE_BUY:{
      const { key } = action.payload;
      const newState = cloneDeep(state);
      if(state[key]){
        newState[key].quantity++;
        newState[key].items.push({
          id: Date.now(),
          left: null,
          top: null
        });
      } else {
        newState[key] = {
          quantity: 1,
          items: [
            {
              id: Date.now(),
              left: null,
              top: null
            }
          ]
        }
      }
      return newState;
    }
    case CONSUME_ITEM: {
      const { key, id } = action.payload;
      const newState = cloneDeep(state);
      const consumedIndex = newState[key].items.findIndex((element) => element.id === id);
      newState[key].items.splice(consumedIndex,1);
      return newState;
    }
    case BACKPACK_PLACE: {
      const  { key } = action.payload;
      if(state[key].quantity >= 1){
        const newState = cloneDeep(state);
        newState[key].quantity--;
        const nextToPlace = newState[key].items.find((element) => element.left === null);
        nextToPlace.left = Math.floor(Math.random()*(width - 60 - 60 +1)+60);
        nextToPlace.top = Math.floor(Math.random()*(height - 100 - 60 +1)+60);
        return newState;
      }

      return state;
    }
    case RESET_GAME: {
      return cloneDeep(INITIAL_STATE);
    }
    default:
      return state;
  }
}
