import {
  REGISTER_VOL_CHANGE_NAME,
  REGISTER_VOL_CHANGE_EMAIL,
  REGISTER_VOL_CHANGE_PASSWORD,
  REGISTER_VOL_CHANGE_DOB,
  REGISTER_VOL_CHANGE_NRIC,
  REGISTER_VOL_CHANGE_ADDRESS,
  REGISTER_VOL_CHANGE_POSTAL,
  REGISTER_VOL_CHANGE_CHURCH,
  REGISTER_VOL_CHANGE_DEPT,
  REGISTER_VOL_CHANGE_GENDER,
  REGISTER_VOL_CHANGE_NUMBER,
  REGISTER_VOL_SUBMIT_START,
  REGISTER_VOL_SUBMIT_SUCCESS,
  REGISTER_VOL_SUBMIT_FAILURE,
  REGISTER_VOL_RESET_NOTIFICATION,
  REGISTER_VOL_DISCARD,
} from '../variables/constants/RegisterVolunteerConstants'
import { postCreateNewVolunteerAPI } from '../api/VolunteersAPI'
import { volunteerLogin } from './loginVolunteerActions'

export function createVolunteer(volunteerObject) {
  return function(dispatch) {
    dispatch(registerVolStart())
    return postCreateNewVolunteerAPI(volunteerObject)
      .then(json => {
        if (json.status) {
          dispatch(registerVolSuccess())

          // sign in
          const loginObject = {
            email: volunteerObject.email,
            password: volunteerObject.password
          }
          dispatch(volunteerLogin(loginObject))
        } else {
          dispatch(registerVolFailure())
        }
      })
      .catch(err => {
        dispatch(registerVolFailure())
      })
  }
}
function registerVolStart() {
  return {
    type: REGISTER_VOL_SUBMIT_START
  }
}
function registerVolSuccess() {
  return {
    type: REGISTER_VOL_SUBMIT_SUCCESS
  }
}
function registerVolFailure() {
  return {
    type: REGISTER_VOL_SUBMIT_FAILURE
  }
}

export function changeName(value) {
  return {
    type: REGISTER_VOL_CHANGE_NAME,
    value
  }
}
export function changeEmail(value) {
  return {
    type: REGISTER_VOL_CHANGE_EMAIL,
    value
  }
}
export function changePassword(value) {
  return {
    type: REGISTER_VOL_CHANGE_PASSWORD,
    value
  }
}
export function changeDob(value) {
  return {
    type: REGISTER_VOL_CHANGE_DOB,
    value
  }
}
export function changeNRIC(value) {
  return {
    type: REGISTER_VOL_CHANGE_NRIC,
    value
  }
}
export function changeAddress(value) {
  return {
    type: REGISTER_VOL_CHANGE_ADDRESS,
    value
  }
}
export function changePostal(value) {
  return {
    type: REGISTER_VOL_CHANGE_POSTAL,
    value
  }
}
export function changeChurch(value) {
  return {
    type: REGISTER_VOL_CHANGE_CHURCH,
    value
  }
}
export function changeDept(value) {
  return {
    type: REGISTER_VOL_CHANGE_DEPT,
    value
  }
}
export function changeGender(value) {
  return {
    type: REGISTER_VOL_CHANGE_GENDER,
    value
  }
}
export function changeNumber(value) {
  return {
    type: REGISTER_VOL_CHANGE_NUMBER,
    value
  }
}
export function resetNotification() {
  return {
    type: REGISTER_VOL_RESET_NOTIFICATION
  }
}
export function discard() {
  return {
    type: REGISTER_VOL_DISCARD
  }
}
