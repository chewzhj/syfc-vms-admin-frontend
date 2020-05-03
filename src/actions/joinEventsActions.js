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
import { getMyEventsWithPicture } from './myEventsActions'
import {
  postJoinEventAPI,
  getAllEventsAPI,
  getEventsOfVolunteerAPI,
  getEventPictureAPI,
} from '../api/EventsAPI'

function eventSortFunc(e1, e2) {
  const e1moment = moment(e1.start_date)
  if (e1moment.isSame(e2.start_date, 'day')) {
    return e1.id - e2.id
  } else {
    return e1moment.isBefore(e2.start_date) ? -1 : 1
  }
}
function generateAvailableUnjoinedEvents(eventsList, myEventsList) {
  const availableEvents = []
  const dayBefore = moment().subtract(1, 'days').startOf('day')

  for (const event of eventsList) {
    const contains = myEventsList.filter(myEvent => myEvent.id === event.id)
    if (contains.length === 0) {
      const startMoment = moment(event.start_date)
      if (startMoment.isAfter(dayBefore)) {
        availableEvents.push(event)
      }
    }
  }

  return availableEvents.sort(eventSortFunc).map(e => ({...e, picture: null, pictureLoading: false}))
}

// retrieve all events, then my events
// generate available events based on time and events joined
// retrieve picture for each available event
export function getAvailableEventsWithPicture() {
  return function(dispatch) {
    dispatch(getAvailableEventsStart())
    return getAllEventsAPI()
      .then(allJson => {
        if (allJson.status === 200) {
          const allEvents = allJson.data

          // get my events
          return getEventsOfVolunteerAPI()
            .then(myEventsJson => {
              if (myEventsJson.status === 200) {
                const myEvents = myEventsJson.data
                // filter available events
                const availableEvents = generateAvailableUnjoinedEvents(allEvents, myEvents)
                dispatch(getAvailableEventsSuccess(availableEvents))
                dispatch(getAvailableEventsPictures(availableEvents))
              } else {
                dispatch(getAvailableEventsFailure())
              }
            })
            .catch(err => {
              dispatch(getAvailableEventsFailure())
            })

        } else {
          dispatch(getAvailableEventsFailure())
        }
      })
      .catch(err => {
        dispatch(getAvailableEventsFailure())
      })
  }
}
function getAvailableEventsStart() {
  return {
    type: JOIN_EVENTS_GET_AVAILABLE_EVENTS_START,
  }
}
function getAvailableEventsSuccess(value) {
  return {
    type: JOIN_EVENTS_GET_AVAILABLE_EVENTS_SUCCESS,
    value
  }
}
function getAvailableEventsFailure() {
  return {
    type: JOIN_EVENTS_GET_AVAILABLE_EVENTS_FAILURE,
  }
}

export function getAvailableEventsPictures(events) {
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
    type: JOIN_EVENTS_PICTURE_START,
    eventId,
  }
}
function getEventPictureSuccess(eventId, picture) {
  return {
    type: JOIN_EVENTS_PICTURE_SUCCESS,
    eventId,
    value: picture,
  }
}
function getEventPictureFailure(eventId) {
  return {
    type: JOIN_EVENTS_PICTURE_FAILURE,
    eventId,
  }
}

export function joinEvent(eventId, role) {
  return function(dispatch) {
    dispatch(joinStart())
    return postJoinEventAPI(eventId, role)
      .then(json => {
        if (json.status === 200) {
          dispatch(joinSuccess())
          dispatch(getMyEventsWithPicture())
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
