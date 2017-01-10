import {
  UPDATE_WELLBEING_STATS
} from './types';

export const updateWellbeingStats = (stats) => {
  return {
    type: UPDATE_WELLBEING_STATS,
    payload: stats
  }
}
