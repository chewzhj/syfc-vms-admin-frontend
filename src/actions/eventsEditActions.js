import {
  EVENTS_EDIT_LOAD_EVENT,
  EVENTS_EDIT_CHANGE_TITLE,
  EVENTS_EDIT_CHANGE_DATES,
  EVENTS_EDIT_CHANGE_DESC,
  EVENTS_EDIT_CHANGE_ROLES,
  EVENTS_EDIT_DISCARD,
  EVENTS_EDIT_SUBMIT_START,
  EVENTS_EDIT_SUBMIT_SUCCESS,
  EVENTS_EDIT_SUBMIT_FAILURE,
  EVENTS_DELETE_START,
  EVENTS_DELETE_SUCCESS,
  EVENTS_DELETE_FAILURE,
  EVENTS_EDIT_RESET_NOTIFICATION,
} from '../variables/constants/EventsEditConstants'
import {
  postUpdateEventAPI,
  deleteEventAPI,
} from '../api/EventsAPI'

export function editEvent(eventId, eventObject) {
  return function(dispatch) {
    dispatch(editEventStart())
    return postUpdateEventAPI(eventId, eventObject)
      .then(json => {
        if (json.status) {
          dispatch(editEventSuccess())
        } else {
          dispatch(editEventFailure())
        }
      })
      .catch(err => {
        dispatch(editEventFailure())
      })
  }
}
function editEventStart() {
  return {
    type: EVENTS_EDIT_SUBMIT_START
  }
}
function editEventSuccess() {
  return {
    type: EVENTS_EDIT_SUBMIT_SUCCESS
  }
}
function editEventFailure() {
  return {
    type: EVENTS_EDIT_SUBMIT_FAILURE
  }
}

export function deleteEvent(eventId) {
  return function(dispatch) {
    dispatch(deleteEventStart())
    return deleteEventAPI(eventId)
      .then(json => {
        if (json.status) {
          dispatch(deleteEventSuccess())
        } else {
          dispatch(deleteEventFailure())
        }
      })
      .catch(err => {
        dispatch(deleteEventFailure())
      })
  }
}
function deleteEventStart() {
  return {
    type: EVENTS_DELETE_START
  }
}
function deleteEventSuccess() {
  return {
    type: EVENTS_DELETE_SUCCESS
  }
}
function deleteEventFailure() {
  return {
    type: EVENTS_DELETE_FAILURE
  }
}

export function loadEvent(value) {
  return {
    type: EVENTS_EDIT_LOAD_EVENT,
    value
  }
}
export function changeTitle(value) {
  return {
    type: EVENTS_EDIT_CHANGE_TITLE,
    value
  }
}
export function changeDates(value) {
  return {
    type: EVENTS_EDIT_CHANGE_DATES,
    value
  }
}
export function changeDesc(value) {
  return {
    type: EVENTS_EDIT_CHANGE_DESC,
    value
  }
}
export function changeRoles(value) {
  return {
    type: EVENTS_EDIT_CHANGE_ROLES,
    value
  }
}
export function discard() {
  return {
    type: EVENTS_EDIT_DISCARD
  }
}
export function resetNotification() {
  return {
    type: EVENTS_EDIT_RESET_NOTIFICATION
  }
}
