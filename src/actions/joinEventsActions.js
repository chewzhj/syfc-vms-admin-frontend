import {
  JOIN_EVENTS_JOIN_START,
  JOIN_EVENTS_JOIN_SUCCESS,
  JOIN_EVENTS_JOIN_FAILURE,
  JOIN_EVENTS_VIEW_EVENT,
  JOIN_EVENTS_CHANGE_ROLE,
  JOIN_EVENTS_CLOSE_VIEW,
  JOIN_EVENTS_RESET_NOTIFICATION,
} from '../variables/constants/JoinEventsConstants'
import { getMyEvents } from './myEventsActions'
import { postJoinEventAPI } from '../api/EventsAPI'

export function joinEvent(eventId, role) {
  return function(dispatch) {
    dispatch(joinStart())
    return postJoinEventAPI(eventId, role)
      .then(json => {
        if (json.status === 200) {
          dispatch(joinSuccess())
          dispatch(getMyEvents())
        } else {
          dispatch(joinFailure())
        }
      })
      .catch(err => {
        dispatch(joinFailure())
      })
  }
}
function joinStart() {
  return {
    type: JOIN_EVENTS_JOIN_START,
  }
}
function joinSuccess() {
  return {
    type: JOIN_EVENTS_JOIN_SUCCESS,
  }
}
function joinFailure() {
  return {
    type: JOIN_EVENTS_JOIN_FAILURE,
  }
}

export function viewEvent(value) {
  return {
    type: JOIN_EVENTS_VIEW_EVENT,
    value
  }
}
export function changeRole(value) {
  return {
    type: JOIN_EVENTS_CHANGE_ROLE,
    value
  }
}
export function closeView() {
  return {
    type: JOIN_EVENTS_CLOSE_VIEW
  }
}
export function resetNotification() {
  return {
    type: JOIN_EVENTS_RESET_NOTIFICATION
  }
}
