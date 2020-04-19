import {
  EVENTS_EDIT_LOAD_EVENT,
  EVENTS_EDIT_CHANGE_TITLE,
  EVENTS_EDIT_CHANGE_DATES,
  EVENTS_EDIT_CHANGE_DESC,
  EVENTS_EDIT_DISCARD,
  EVENTS_EDIT_SUBMIT_START,
  EVENTS_EDIT_SUBMIT_SUCCESS,
  EVENTS_EDIT_SUBMIT_FAILURE,
  EVENTS_DELETE_START,
  EVENTS_DELETE_SUCCESS,
  EVENTS_DELETE_FAILURE,
  EVENTS_EDIT_RESET_NOTIFICATION,
} from '../variables/constants/EventsEditConstants'

const initialState = {
  originalEventDetails: {},
  eventTitle: '',
  eventDates: null,
  eventDesc: '',
  submitting: false,
  growlMessage: '',
  deleting: false,
  growlDeleting: '',
}

export function eventsEditReducer(state = initialState, action) {
  switch (action.type) {
    case EVENTS_EDIT_LOAD_EVENT:
      return {
        ...state,
        ...action.value,
        originalEventDetails: action.value
      }
    case EVENTS_EDIT_CHANGE_TITLE:
      return {...state, eventTitle: action.value}
    case EVENTS_EDIT_CHANGE_DATES:
      return {...state, eventDates: action.value}
    case EVENTS_EDIT_CHANGE_DESC:
      return {...state, eventDesc: action.value}
    case EVENTS_EDIT_SUBMIT_START:
      return {...state, submitting: true}
    case EVENTS_EDIT_SUBMIT_SUCCESS:
      return {...initialState, submitting: false, growlMessage: 'success'}
    case EVENTS_EDIT_SUBMIT_FAILURE:
      return {...state, submitting: false, growlMessage: 'error'}
    case EVENTS_DELETE_START:
      return {...state, deleting: true}
    case EVENTS_DELETE_SUCCESS:
      return {...initialState, deleting: false, growlDeleting: 'success'}
    case EVENTS_DELETE_FAILURE:
      return {...state, deleting: false, growlDeleting: 'error'}
    case EVENTS_EDIT_RESET_NOTIFICATION:
      return {...state, growlMessage: '', growlDeleting: ''}
    case EVENTS_EDIT_DISCARD:
      return initialState
    default:
      return state
  }
}
