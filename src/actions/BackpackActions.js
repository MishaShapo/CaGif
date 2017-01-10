import {
  BACKPACK_PLACE
} from './types';

export const backpackPlace = ({key, price}) => {
  return {
    type: BACKPACK_PLACE,
    payload: {key, price}
  };
}
