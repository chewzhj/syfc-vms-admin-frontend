import {
  INCREMENT_COUNTER,
  RESET_COUNTER,
  CHANGE_INCREMENT,
} from '../variables/constants/CounterConstants'

//example counter

export function incrementCounter() {
  return {type: INCREMENT_COUNTER}
}

export function resetCounter() {
  return {type: RESET_COUNTER}
}

export function changeIncrement(incrementValue) {
  return {
    type: CHANGE_INCREMENT,
    incrementValue,
  }
}
