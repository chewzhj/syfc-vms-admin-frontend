import {
  EVENTS_MAIN_RETRIEVE_EVENTS_START,
  EVENTS_MAIN_RETRIEVE_EVENTS_SUCCESS,
  EVENTS_MAIN_RETRIEVE_EVENTS_FAILURE,
} from '../variables/constants/EventsMainConstants'
import { getAllEventsAPI } from '../api/EventsAPI'

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
