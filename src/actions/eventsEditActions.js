import {
  EVENTS_EDIT_LOAD_EVENT,
  EVENTS_EDIT_CHANGE_TITLE,
  EVENTS_EDIT_CHANGE_DATES,
  EVENTS_EDIT_CHANGE_DESC,
  EVENTS_EDIT_CHANGE_ROLES,
  EVENTS_EDIT_DISCARD,
  EVENTS_EDIT_OPEN_PICTURE_DIALOG,
  EVENTS_EDIT_CLOSE_PICTURE_DIALOG,
  EVENTS_EDIT_GET_PICTURE_START,
  EVENTS_EDIT_GET_PICTURE_SUCCESS,
  EVENTS_EDIT_GET_PICTURE_FAILURE,
  EVENTS_EDIT_CHOOSE_PICTURE,
  EVENTS_EDIT_SET_PICTURE_START,
  EVENTS_EDIT_SET_PICTURE_SUCCESS,
  EVENTS_EDIT_SET_PICTURE_FAILURE,
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
  getEventPictureAPI,
  postUpdateEventPictureAPI,
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

export function loadPicture(eventId) {
  return function(dispatch) {
    dispatch(loadPictureStart())
    return getEventPictureAPI(eventId)
      .then(json => {
        if (json.status === 200) {
          dispatch(loadPictureSuccess(json.data))
        } else {
          dispatch(loadPictureFailure())
        }
      })
      .catch(err => {
        dispatch(loadPictureFailure())
      })
  }
}
function loadPictureStart() {
  return {
    type: EVENTS_EDIT_GET_PICTURE_START
  }
}
function loadPictureSuccess(picture) {
  return {
    type: EVENTS_EDIT_GET_PICTURE_SUCCESS,
    value: picture
  }
}
function loadPictureFailure() {
  return {
    type: EVENTS_EDIT_GET_PICTURE_FAILURE
  }
}

export function updatePicture(eventId, pictureForm) {
  return function(dispatch) {
    dispatch(updatePictureStart())
    return postUpdateEventPictureAPI(eventId, pictureForm)
      .then(json => {
        if (json.status === 200) {
          dispatch(updatePictureSuccess())
          dispatch(loadPicture(eventId))
        } else {
          dispatch(updatePictureFailure())
        }
      })
      .catch(err => {
        dispatch(updatePictureFailure())
      })
  }
}
function updatePictureStart() {
  return {
    type: EVENTS_EDIT_SET_PICTURE_START
  }
}
function updatePictureSuccess() {
  return {
    type: EVENTS_EDIT_SET_PICTURE_SUCCESS
  }
}
function updatePictureFailure() {
  return {
    type: EVENTS_EDIT_SET_PICTURE_FAILURE
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
export function openPictureDialog() {
  return {
    type: EVENTS_EDIT_OPEN_PICTURE_DIALOG
  }
}
export function closePictureDialog() {
  return {
    type: EVENTS_EDIT_CLOSE_PICTURE_DIALOG
  }
}
export function choosePicture(picture) {
  return {
    type: EVENTS_EDIT_CHOOSE_PICTURE,
    value: picture
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
