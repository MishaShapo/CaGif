
import { Dimensions } from 'react-native';
import {
  STORE_BUY,
  BACKPACK_PLACE
} from '../actions/types';
const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case STORE_BUY:{
      const { key, price } = action.payload;
      const newState = { ...state };
      if(key in state){
        newState[key].quantity = state[key].quantity + 1;
        newState[key].locations.push({
          id: state[key].quantity + 1,
          left: null,
          top: null
        });
      } else {
        newState[key] = {
          price,
          quantity: 1,
          locations: [{
            id: 1,
            left: null,
            top: null
          }]
        }
      }
      return newState;
    }
    case BACKPACK_PLACE: {
      const {key} = action.payload;
      const newState = { ...state};
      newState[key].quantity = state[key].quantity - 1;
      const index = newState[key].locations.findIndex( loc => loc.left === null);
      newState[key].locations[index].left =  Math.floor(Math.random() * (Dimensions.get('window').width-80 - 80 + 1)) + 80;
      newState[key].locations[index].top = Math.floor(Math.random() * (Dimensions.get('window').height-80 - 80 + 1)) + 80;
      return newState;
    }
    default:
      return state;
  }
}
