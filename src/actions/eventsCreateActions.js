import {
  EVENTS_CREATE_CHANGE_TITLE,
  EVENTS_CREATE_CHANGE_DATES,
  EVENTS_CREATE_CHANGE_DESC,
  EVENTS_CREATE_CHANGE_ROLES,
  EVENTS_CREATE_DISCARD,
  EVENTS_CREATE_SUBMIT_START,
  EVENTS_CREATE_SUBMIT_SUCCESS,
  EVENTS_CREATE_SUBMIT_FAILURE,
  EVENTS_CREATE_RESET_NOTIFICATION,
} from '../variables/constants/EventsCreateConstants'
import { postCreateNewEventAPI } from '../api/EventsAPI'

export function submitEvent(eventObject) {
  return function(dispatch) {
    dispatch(submitEventStart())
    return postCreateNewEventAPI(eventObject)
      .then(json => {
        if (json.status) {
          dispatch(submitEventSuccess())
        } else {
          dispatch(submitEventFailure())
        }
      })
      .catch(err => {
        dispatch(submitEventFailure())
      })
  }
}
function submitEventStart() {
  return {
    type: EVENTS_CREATE_SUBMIT_START
  }
}
function submitEventSuccess() {
  return {
    type: EVENTS_CREATE_SUBMIT_SUCCESS
  }
}
function submitEventFailure() {
  return {
    type: EVENTS_CREATE_SUBMIT_FAILURE
  }
}

export function changeTitle(value) {
  return {
    type: EVENTS_CREATE_CHANGE_TITLE,
    value
  }
}
export function changeDates(value) {
  return {
    type: EVENTS_CREATE_CHANGE_DATES,
    value
  }
}
export function changeDesc(value) {
  return {
    type: EVENTS_CREATE_CHANGE_DESC,
    value
  }
}
export function changeRoles(value) {
  return {
    type: EVENTS_CREATE_CHANGE_ROLES,
    value
  }
}
export function discard() {
  return {
    type: EVENTS_CREATE_DISCARD
  }
}
export function resetNotification() {
  return {
    type: EVENTS_CREATE_RESET_NOTIFICATION
  }
}
