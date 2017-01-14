
import {
  STORE_BUY
} from './types'

export const buyMerchandise = (item) => {
  return {
    type: STORE_BUY,
    payload: {...item}
  };
}
