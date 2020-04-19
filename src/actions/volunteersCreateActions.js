import {
  VOL_CREATE_CHANGE_NAME,
  VOL_CREATE_CHANGE_EMAIL,
  VOL_CREATE_CHANGE_PASSWORD,
  VOL_CREATE_CHANGE_DOB,
  VOL_CREATE_CHANGE_NRIC,
  VOL_CREATE_CHANGE_ADDRESS,
  VOL_CREATE_CHANGE_POSTAL,
  VOL_CREATE_CHANGE_CHURCH,
  VOL_CREATE_CHANGE_DEPT,
  VOL_CREATE_CHANGE_GENDER,
  VOL_CREATE_CHANGE_NUMBER,
  VOL_CREATE_SUBMIT_START,
  VOL_CREATE_SUBMIT_SUCCESS,
  VOL_CREATE_SUBMIT_FAILURE,
  VOL_CREATE_RESET_NOTIFICATION,
  VOL_CREATE_DISCARD,
} from '../variables/constants/VolunteersCreateConstants'
import { postCreateNewVolunteerAPI } from '../api/VolunteersAPI'

export function createVolunteer(volunteerObject) {
  return function(dispatch) {
    dispatch(createVolStart())
    return postCreateNewVolunteerAPI(volunteerObject)
      .then(json => {
        if (json.status) {
          dispatch(createVolSuccess())
        } else {
          dispatch(createVolFailure())
        }
      })
      .catch(err => {
        dispatch(createVolFailure())
      })
  }
}
function createVolStart() {
  return {
    type: VOL_CREATE_SUBMIT_START
  }
}
function createVolSuccess() {
  return {
    type: VOL_CREATE_SUBMIT_SUCCESS
  }
}
function createVolFailure() {
  return {
    type: VOL_CREATE_SUBMIT_FAILURE
  }
}

export function changeName(value) {
  return {
    type: VOL_CREATE_CHANGE_NAME,
    value
  }
}
export function changeEmail(value) {
  return {
    type: VOL_CREATE_CHANGE_EMAIL,
    value
  }
}
export function changePassword(value) {
  return {
    type: VOL_CREATE_CHANGE_PASSWORD,
    value
  }
}
export function changeDob(value) {
  return {
    type: VOL_CREATE_CHANGE_DOB,
    value
  }
}
export function changeNRIC(value) {
  return {
    type: VOL_CREATE_CHANGE_NRIC,
    value
  }
}
export function changeAddress(value) {
  return {
    type: VOL_CREATE_CHANGE_ADDRESS,
    value
  }
}
export function changePostal(value) {
  return {
    type: VOL_CREATE_CHANGE_POSTAL,
    value
  }
}
export function changeChurch(value) {
  return {
    type: VOL_CREATE_CHANGE_CHURCH,
    value
  }
}
export function changeDept(value) {
  return {
    type: VOL_CREATE_CHANGE_DEPT,
    value
  }
}
export function changeGender(value) {
  return {
    type: VOL_CREATE_CHANGE_GENDER,
    value
  }
}
export function changeNumber(value) {
  return {
    type: VOL_CREATE_CHANGE_NUMBER,
    value
  }
}
export function resetNotification() {
  return {
    type: VOL_CREATE_RESET_NOTIFICATION
  }
}
export function discard() {
  return {
    type: VOL_CREATE_DISCARD
  }
}
