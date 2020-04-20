import {
  EVENTS_MAIN_RETRIEVE_EVENTS_START,
  EVENTS_MAIN_RETRIEVE_EVENTS_SUCCESS,
  EVENTS_MAIN_RETRIEVE_EVENTS_FAILURE,
  EVENTS_MAIN_RETRIEVE_EVENT_VOL_START,
  EVENTS_MAIN_RETRIEVE_EVENT_VOL_SUCCESS,
  EVENTS_MAIN_RETRIEVE_EVENT_VOL_FAILURE,
  EVENTS_MAIN_EV_MODAL_CLOSE,
} from '../variables/constants/EventsMainConstants'
import { getAllEventsAPI, getVolunteersInEventAPI } from '../api/EventsAPI'

export function retrieveEvents() {
  return function(dispatch) {
    dispatch(retrieveEventsStart())
    return getAllEventsAPI()
      .then(json => {
        if (json.status === 200) {
          dispatch(retrieveEventsSuccess(json.data))
        } else {
          dispatch(retrieveEventsFailure())
        }
      })
      .catch(err => {
        dispatch(retrieveEventsFailure())
      })
  }
}

function retrieveEventsStart() {
  return {
    type: EVENTS_MAIN_RETRIEVE_EVENTS_START,
  }
}
function retrieveEventsSuccess(value) {
  return {
    type: EVENTS_MAIN_RETRIEVE_EVENTS_SUCCESS,
    value
  }
}
function retrieveEventsFailure() {
  return {
    type: EVENTS_MAIN_RETRIEVE_EVENTS_FAILURE,
  }
}

export function retrieveEventVolunteers(eventId) {
  return function(dispatch) {
    dispatch(retrieveEventVolStart(eventId))
    return getVolunteersInEventAPI(eventId)
      .then(json => {
        if (json.status === 200) {
          dispatch(retrieveEventVolSuccess(json.data))
        } else {
          dispatch(retrieveEventVolFailure())
        }
      })
      .catch(err => {
        dispatch(retrieveEventVolFailure())
      })
  }
}

function retrieveEventVolStart(eventId) {
  return {
    type: EVENTS_MAIN_RETRIEVE_EVENT_VOL_START,
    value: eventId
  }
}
function retrieveEventVolSuccess(value) {
  return {
    type: EVENTS_MAIN_RETRIEVE_EVENT_VOL_SUCCESS,
    value
  }
}
function retrieveEventVolFailure() {
  return {
    type: EVENTS_MAIN_RETRIEVE_EVENT_VOL_FAILURE,
  }
}

export function closeEventVolModal() {
  return {
    type: EVENTS_MAIN_EV_MODAL_CLOSE
  }
}
