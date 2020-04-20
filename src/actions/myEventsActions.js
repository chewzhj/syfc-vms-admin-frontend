import {
  MY_EVENTS_LOAD_START,
  MY_EVENTS_LOAD_SUCCESS,
  MY_EVENTS_LOAD_FAILURE,
  MY_EVENTS_VIEW_EVENT,
  MY_EVENTS_CLOSE_VIEW,
} from '../variables/constants/MyEventsConstants'
import {getEventsOfVolunteerAPI} from '../api/EventsAPI'

export function getMyEvents() {
  return function(dispatch) {
    dispatch(getMyEventsStart())
    return getEventsOfVolunteerAPI()
      .then(json => {
        if (json.status === 200) {
          dispatch(getMyEventsSuccess(json.data))
        } else {
          dispatch(getMyEventsFailure())
        }
      })
      .catch(err => {
        dispatch(getMyEventsFailure())
      })
  }
}

function getMyEventsStart() {
  return {
    type: MY_EVENTS_LOAD_START,
  }
}
function getMyEventsSuccess(value) {
  return {
    type: MY_EVENTS_LOAD_SUCCESS,
    value
  }
}
function getMyEventsFailure() {
  return {
    type: MY_EVENTS_LOAD_FAILURE,
  }
}

export function viewEvent(value) {
  return {
    type: MY_EVENTS_VIEW_EVENT,
    value
  }
}
export function closeView() {
  return {
    type: MY_EVENTS_CLOSE_VIEW,
  }
}
