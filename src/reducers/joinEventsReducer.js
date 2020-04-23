import {
  JOIN_EVENTS_JOIN_START,
  JOIN_EVENTS_JOIN_SUCCESS,
  JOIN_EVENTS_JOIN_FAILURE,
  JOIN_EVENTS_VIEW_EVENT,
  JOIN_EVENTS_CHANGE_ROLE,
  JOIN_EVENTS_CLOSE_VIEW,
  JOIN_EVENTS_RESET_NOTIFICATION,
} from '../variables/constants/JoinEventsConstants'

const initialState = {
  viewEvent: '',
  viewEventVisible: false,
  role: '',
  joining: false,
  growlMessage: '',
}

export function joinEventsReducer(state = initialState, action) {
  switch (action.type) {
    case JOIN_EVENTS_JOIN_START:
      return {...state, joining: true}
    case JOIN_EVENTS_JOIN_SUCCESS:
      return {...state, joining: false, growlMessage: 'success'}
    case JOIN_EVENTS_JOIN_FAILURE:
      return {...state, joining: false, growlMessage: 'error'}
    case JOIN_EVENTS_RESET_NOTIFICATION:
      return {...state, growlMessage: ''}
    case JOIN_EVENTS_VIEW_EVENT:
      return {...state, viewEvent: action.value, viewEventVisible: true}
    case JOIN_EVENTS_CHANGE_ROLE:
      return {...state, role: action.value}
    case JOIN_EVENTS_CLOSE_VIEW:
      return {...state, viewEvent: '', role: '', viewEventVisible: false}
    default:
      return state
  }
}
