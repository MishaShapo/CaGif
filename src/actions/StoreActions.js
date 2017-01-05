
import {
  STORE_BUY,
  STORE_FETCH_SUCCESS
} from './types'

export const merchandiseFetch = () => {

  return (dispatch) => {
    fetch("https://script.google.com/macros/s/AKfycbwqQ5INPHYdk3IbNYpUBpBd6OYq2S5xF_TlVTH_lGJh_HqwMs8/exec")
      .then((response) => response.json())
      .then((responseJSON) => {
        dispatch({
          type: STORE_FETCH_SUCCESS,
          payload: responseJSON
        })
      })
      .catch((error) => {
        console.log("store fetch failed", error);
      })
  }
}

export const buyMerchandise = (key,price) => {
  return {
    type: STORE_BUY,
    payload: {key, price}
  };
}
