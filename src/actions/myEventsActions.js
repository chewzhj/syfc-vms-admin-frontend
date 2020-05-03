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
import {getEventsOfVolunteerAPI, getEventPictureAPI} from '../api/EventsAPI'
import moment from 'moment'

function eventSortFunc(e1, e2) {
  const e1moment = moment(e1.start_date)
  if (e1moment.isSame(e2.start_date, 'day')) {
    return e1.id - e2.id
  } else {
    return e1moment.isBefore(e2.start_date) ? -1 : 1
  }
}

export function getMyEventsWithPicture() {
  return function(dispatch) {
    dispatch(getMyEventsStart())
    return getEventsOfVolunteerAPI()
      .then(json => {
        if (json.status === 200) {
          const data = json.data.sort(eventSortFunc).map(e => ({...e, picture: null, pictureLoading: false}))
          dispatch(getMyEventsSuccess(data))
          dispatch(getMyEventsPictures(data))
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


export function getMyEventsPictures(events) {
  return function(dispatch) {
    for (const event of events) {
      const id = event.id
      dispatch(getEventPictureStart(id))
      getEventPictureAPI(id)
        .then(json => {
          if (json.status === 200) {
            const data = json.data
            dispatch(getEventPictureSuccess(id, data))
          } else {
            dispatch(getEventPictureFailure(id))
          }
        })
        .catch(err => {
          dispatch(getEventPictureFailure(id))
        })
    }
  }
}
function getEventPictureStart(eventId) {
  return {
    type: MY_EVENTS_PICTURE_START,
    eventId,
  }
}
function getEventPictureSuccess(eventId, picture) {
  return {
    type: MY_EVENTS_PICTURE_SUCCESS,
    eventId,
    value: picture,
  }
}
function getEventPictureFailure(eventId) {
  return {
    type: MY_EVENTS_PICTURE_FAILURE,
    eventId,
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
