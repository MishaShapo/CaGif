import {
  UPDATE_WELLBEING_STATS,
  CONSUME_ITEM,
  RESET_CHANGE_STATS
} from './types';

export const updateWellbeingStats = (stats) => {
  return {
    type: UPDATE_WELLBEING_STATS,
    payload: stats
  }
}

export const consumeItem = (item) => {
  return {
    type: CONSUME_ITEM,
    payload: item
  }
}

export const resetChangeStats = (stats) => {
  return {
    type: RESET_CHANGE_STATS,
    payload: stats
  }
}
