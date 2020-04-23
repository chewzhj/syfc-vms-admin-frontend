import {
  VOLUNTEERS_MAIN_RETRIEVE_VOLUNTEERS_START,
  VOLUNTEERS_MAIN_RETRIEVE_VOLUNTEERS_SUCCESS,
  VOLUNTEERS_MAIN_RETRIEVE_VOLUNTEERS_FAILURE,
  VOLUNTEERS_MAIN_RETRIEVE_VOL_EVENTS_START,
  VOLUNTEERS_MAIN_RETRIEVE_VOL_EVENTS_SUCCESS,
  VOLUNTEERS_MAIN_RETRIEVE_VOL_EVENTS_FAILURE,
  VOLUNTEERS_MAIN_VE_MODAL_CLOSE,
} from '../variables/constants/VolunteersMainConstants'
import {getAllVolunteersAPI} from '../api/VolunteersAPI'
import {getEventsOfVolunteerAPI} from '../api/EventsAPI'
import moment from 'moment'

function eventSortFunc(e1, e2) {
  const e1moment = moment(e1.start_date)
  if (e1moment.isSame(e2.start_date, 'day')) {
    return e1.id - e2.id
  } else {
    return e1moment.isBefore(e2.start_date) ? -1 : 1
  }
}

export function retrieveVolunteers() {
  return function(dispatch) {
    dispatch(retrieveVolunteersStart())
    return getAllVolunteersAPI()
      .then(json => {
        if (json.status === 200) {
          dispatch(retrieveVolunteersSuccess(json.data))
        } else {
          dispatch(retrieveVolunteersFailure())
        }
      })
      .catch(err => {
        dispatch(retrieveVolunteersFailure())
      })
  }
}
function retrieveVolunteersStart() {
  return {
    type: VOLUNTEERS_MAIN_RETRIEVE_VOLUNTEERS_START,
  }
}
function retrieveVolunteersSuccess(value) {
  return {
    type: VOLUNTEERS_MAIN_RETRIEVE_VOLUNTEERS_SUCCESS,
    value
  }
}
function retrieveVolunteersFailure() {
  return {
    type: VOLUNTEERS_MAIN_RETRIEVE_VOLUNTEERS_FAILURE,
  }
}

export function getVolEvents(volId) {
  return function(dispatch) {
    dispatch(retrieveVolEventsStart(volId))
    return getEventsOfVolunteerAPI(volId)
      .then(json => {
        if (json.status === 200) {
          const data = json.data.sort(eventSortFunc)
          dispatch(retrieveVolEventsSuccess(data))
        } else {
          dispatch(retrieveVolEventsFailure())
        }
      })
      .catch(err => {
        dispatch(retrieveVolEventsFailure())
      })
  }
}
function retrieveVolEventsStart(value) {
  return {
    type: VOLUNTEERS_MAIN_RETRIEVE_VOL_EVENTS_START,
    value
  }
}
function retrieveVolEventsSuccess(value) {
  return {
    type: VOLUNTEERS_MAIN_RETRIEVE_VOL_EVENTS_SUCCESS,
    value
  }
}
function retrieveVolEventsFailure() {
  return {
    type: VOLUNTEERS_MAIN_RETRIEVE_VOL_EVENTS_FAILURE,
  }
}

export function closeVEModal() {
  return {
    type: VOLUNTEERS_MAIN_VE_MODAL_CLOSE
  }
}
