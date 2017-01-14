import {
  BACKPACK_PLACE
} from './types';

export const backpackPlace = (item) => {
  return {
    type: BACKPACK_PLACE,
    payload: item
  };
}
