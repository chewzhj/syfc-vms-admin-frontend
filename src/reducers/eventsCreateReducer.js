import {
  EVENTS_CREATE_CHANGE_TITLE,
  EVENTS_CREATE_CHANGE_DATES,
  EVENTS_CREATE_CHANGE_DESC,
  EVENTS_CREATE_CHANGE_ROLES,
  EVENTS_CREATE_CHANGE_PICTURE,
  EVENTS_CREATE_DISCARD,
  EVENTS_CREATE_SUBMIT_START,
  EVENTS_CREATE_SUBMIT_SUCCESS,
  EVENTS_CREATE_SUBMIT_FAILURE,
  EVENTS_CREATE_RESET_NOTIFICATION,
} from '../variables/constants/EventsCreateConstants'

const initialState = {
  eventTitle: '',
  eventDates: null,
  eventDesc: '',
  eventRoles: [],
  eventPicture: [],
  submitting: false,
  growlMessage: '',
}

export function eventsCreateReducer(state = initialState, action) {
  switch (action.type) {
    case EVENTS_CREATE_CHANGE_TITLE:
      return {...state, eventTitle: action.value}
    case EVENTS_CREATE_CHANGE_DATES:
      return {...state, eventDates: action.value}
    case EVENTS_CREATE_CHANGE_DESC:
      return {...state, eventDesc: action.value}
    case EVENTS_CREATE_CHANGE_ROLES:
      return {...state, eventRoles: action.value}
    case EVENTS_CREATE_CHANGE_PICTURE:
      return {...state, eventPicture: action.value}
    case EVENTS_CREATE_SUBMIT_START:
      return {...state, submitting: true}
    case EVENTS_CREATE_SUBMIT_SUCCESS:
      return {...initialState, submitting: false, growlMessage: 'success'}
    case EVENTS_CREATE_SUBMIT_FAILURE:
      return {...state, submitting: false, growlMessage: 'error'}
    case EVENTS_CREATE_RESET_NOTIFICATION:
      return {...state, growlMessage: ''}
    case EVENTS_CREATE_DISCARD:
      return initialState
    default:
      return state
  }
}
