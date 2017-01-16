import {
  UPDATE_WELLBEING_STATS,
  CONSUME_ITEM,
  RESET_CHANGE_STATS,
  CASH_IN_STEPS,
  UPDATE_STEP_COUNT,
  UPDATE_UPDATE_TIMER,
  RESET_GAME
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

export const cashInSteps = () => {
  return {
    type: CASH_IN_STEPS
  }
}

export const updateStepCount = (steps) => {
  return {
    type: UPDATE_STEP_COUNT,
    payload: steps
  }
}

export const updateUpdateTimer = () => {
  return {
    type: UPDATE_UPDATE_TIMER
  }
}

export const resetGame = () => {
  return {
    type: RESET_GAME
  }
}
