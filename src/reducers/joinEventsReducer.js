import {
  JOIN_EVENTS_JOIN_START,
  JOIN_EVENTS_JOIN_SUCCESS,
  JOIN_EVENTS_JOIN_FAILURE,
  JOIN_EVENTS_GET_AVAILABLE_EVENTS_START,
  JOIN_EVENTS_GET_AVAILABLE_EVENTS_SUCCESS,
  JOIN_EVENTS_GET_AVAILABLE_EVENTS_FAILURE,
  JOIN_EVENTS_PICTURE_START,
  JOIN_EVENTS_PICTURE_SUCCESS,
  JOIN_EVENTS_PICTURE_FAILURE,
  JOIN_EVENTS_VIEW_EVENT,
  JOIN_EVENTS_CHANGE_ROLE,
  JOIN_EVENTS_CLOSE_VIEW,
  JOIN_EVENTS_RESET_NOTIFICATION,
} from '../variables/constants/JoinEventsConstants'
import moment from 'moment'

const initialState = {
  availableEvents: [],
  availableEventsLoading: false,
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
    case JOIN_EVENTS_GET_AVAILABLE_EVENTS_START:
      return {...state, availableEventsLoading: true}
    case JOIN_EVENTS_GET_AVAILABLE_EVENTS_SUCCESS:
      return {...state, availableEventsLoading: false, availableEvents: action.value}
    case JOIN_EVENTS_GET_AVAILABLE_EVENTS_FAILURE:
      return {...state, availableEventsLoading: false}
    case JOIN_EVENTS_PICTURE_START: {
      const eListCopy = alterEventsList(action.eventId, true, null, state.availableEvents)
      return {...state, availableEvents: eListCopy}
    }
    case JOIN_EVENTS_PICTURE_SUCCESS: {
      const eListCopy = alterEventsList(action.eventId, false, action.value, state.availableEvents)
      return {...state, availableEvents: eListCopy}
    }
    case JOIN_EVENTS_PICTURE_FAILURE: {
      const eListCopy = alterEventsList(action.eventId, false, null, state.availableEvents)
      return {...state, availableEvents: eListCopy}
    }
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

function eventSortFunc(e1, e2) {
  const e1moment = moment(e1.start_date)
  if (e1moment.isSame(e2.start_date, 'day')) {
    return e1.id - e2.id
  } else {
    return e1moment.isBefore(e2.start_date) ? -1 : 1
  }
}
function alterEventsList(eventId, loading, picture, originalEventsList) {
  const eListCopy = originalEventsList.slice(0)
  const filtered = eListCopy.filter(e => e.id === eventId)
  if (filtered.length === 1) {
    const removed = eListCopy.filter(e => e.id !== eventId)
    const event = filtered[0]
    event.picture = picture
    event.pictureLoading = loading
    removed.push(event)
    return removed.sort(eventSortFunc)
  } else {
    return originalEventsList
  }
}
