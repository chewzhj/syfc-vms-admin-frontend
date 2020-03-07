import {
  INCREMENT_COUNTER,
  RESET_COUNTER,
  CHANGE_INCREMENT,
} from '../variables/constants/CounterConstants'

const initialState = {
  counter: 0,
  incrementValue: 1
}

export function counterReducer(state = initialState, action) {
  switch(action.type) {
    case INCREMENT_COUNTER:
      return {...state, counter: state.counter+state.incrementValue};
    case RESET_COUNTER:
      return {...state, ...initialState};
    case CHANGE_INCREMENT:
      return {...state, incrementValue: action.incrementValue};
    default:
      return state;
  }
}
