import {
  MY_EVENTS_LOAD_START,
  MY_EVENTS_LOAD_SUCCESS,
  MY_EVENTS_LOAD_FAILURE,
  MY_EVENTS_PICTURE_START,
  MY_EVENTS_PICTURE_SUCCESS,
  MY_EVENTS_PICTURE_FAILURE,
  MY_EVENTS_VIEW_EVENT,
  MY_EVENTS_CLOSE_VIEW,
} from '../variables/constants/MyEventsConstants'
import moment from 'moment'

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
    case MY_EVENTS_PICTURE_START: {
      const eListCopy = alterEventsList(action.eventId, true, null, state.myEventsList)
      return {...state, myEventsList: eListCopy}
    }
    case MY_EVENTS_PICTURE_SUCCESS: {
      const eListCopy = alterEventsList(action.eventId, false, action.value, state.myEventsList)
      return {...state, myEventsList: eListCopy}
    }
    case MY_EVENTS_PICTURE_FAILURE: {
      const eListCopy = alterEventsList(action.eventId, false, null, state.myEventsList)
      return {...state, myEventsList: eListCopy}
    }
    case MY_EVENTS_VIEW_EVENT:
      return {...state, viewEvent: action.value, viewEventVisible: true}
    case MY_EVENTS_CLOSE_VIEW:
      return {...state, viewEvent: '', viewEventVisible: false}
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
