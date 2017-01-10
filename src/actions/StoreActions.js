
import {
  STORE_BUY
} from './types'

export const buyMerchandise = (item) => {
  const {key, price} = item;
  return {
    type: STORE_BUY,
    payload: {key, price}
  };
}
