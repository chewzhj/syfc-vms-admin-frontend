import {
  MY_EVENTS_LOAD_START,
  MY_EVENTS_LOAD_SUCCESS,
  MY_EVENTS_LOAD_FAILURE,
  MY_EVENTS_VIEW_EVENT,
  MY_EVENTS_CLOSE_VIEW,
} from '../variables/constants/MyEventsConstants'

const initialState = {
  myEventsLoading: false,
  myEventsList: [],
  viewEvent: '',
  viewEventVisible: false,
}

export function myEventsReducer(state = initialState, action) {
  switch (action.type) {
    case MY_EVENTS_LOAD_START:
      return {...state, myEventsLoading: true}
    case MY_EVENTS_LOAD_SUCCESS:
      return {...state, myEventsLoading: false, myEventsList: action.value}
    case MY_EVENTS_LOAD_FAILURE:
      return {...state, myEventsLoading: false}
    case MY_EVENTS_VIEW_EVENT:
      return {...state, viewEvent: action.value, viewEventVisible: true}
    case MY_EVENTS_CLOSE_VIEW:
      return {...state, viewEvent: '', viewEventVisible: false}
    default:
      return state
  }
}
