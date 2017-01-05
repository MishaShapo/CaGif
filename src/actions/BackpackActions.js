import {
  BACKPACK_PLACE,
  BACKPACK_FETCH_SUCCESS
} from './types';

export const backpackPlace = ({key, price}) => {
  return {
    type: BACKPACK_PLACE,
    payload: {key, price}
  };
}

export const backpackFetch = () => {
  return {
    type: BACKPACK_FETCH_SUCCESS
  }
}
