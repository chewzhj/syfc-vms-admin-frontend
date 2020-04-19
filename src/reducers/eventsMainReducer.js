import {
  EVENTS_MAIN_RETRIEVE_EVENTS_START,
  EVENTS_MAIN_RETRIEVE_EVENTS_SUCCESS,
  EVENTS_MAIN_RETRIEVE_EVENTS_FAILURE,
} from '../variables/constants/EventsMainConstants'

const initialState = {
  eventsLoading: false,
  eventsList: [],
}

export function eventsMainReducer(state = initialState, action) {
  switch (action.type) {
    case EVENTS_MAIN_RETRIEVE_EVENTS_START:
      return {...state, eventsLoading: true}
    case EVENTS_MAIN_RETRIEVE_EVENTS_SUCCESS:
      return {...state, eventsLoading: false, eventsList: action.value}
    case EVENTS_MAIN_RETRIEVE_EVENTS_FAILURE:
      return {...state, eventsLoading: false}
    default:
      return state
  }
}
