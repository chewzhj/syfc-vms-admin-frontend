import {
  LOGIN_STAFF_CHANGE_USERNAME,
  LOGIN_STAFF_CHANGE_PASSWORD,
  LOGIN_STAFF_RESET,
  LOGIN_STAFF_LOGIN_START,
  LOGIN_STAFF_LOGIN_SUCCESS,
  LOGIN_STAFF_LOGIN_FAILURE,
  LOGIN_STAFF_RESET_NOTIFICATION,
} from '../variables/constants/LoginStaffConstants'
import {postStaffLoginAPI} from '../api/LoginAPI'

export function staffLogin(staffLoginObject) {
  return function(dispatch) {
    dispatch(staffLoginStart())
    return postStaffLoginAPI(staffLoginObject)
      .then(json => {
        if (json.status) {
          sessionStorage.setItem('loginType', 'staff')
          sessionStorage.setItem('name', json.data.full_name)
          sessionStorage.setItem('id', json.data.id)
          dispatch(staffLoginSuccess())
        } else {
          dispatch(staffLoginFailure())
        }
      })
      .catch(err => {
        dispatch(staffLoginFailure())
      })
  }
}
function staffLoginStart() {
  return {
    type: LOGIN_STAFF_LOGIN_START
  }
}
function staffLoginSuccess() {
  return {
    type: LOGIN_STAFF_LOGIN_SUCCESS
  }
}
function staffLoginFailure() {
  return {
    type: LOGIN_STAFF_LOGIN_FAILURE
  }
}

export function changeUsername(value) {
  return {
    type: LOGIN_STAFF_CHANGE_USERNAME,
    value
  }
}
export function changePassword(value) {
  return {
    type: LOGIN_STAFF_CHANGE_PASSWORD,
    value
  }
}
export function reset() {
  return {
    type: LOGIN_STAFF_RESET
  }
}
export function resetNotification() {
  return {
    type: LOGIN_STAFF_RESET_NOTIFICATION
  }
}
