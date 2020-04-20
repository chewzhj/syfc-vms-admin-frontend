import {
  LOGIN_VOLUNTEER_CHANGE_EMAIL,
  LOGIN_VOLUNTEER_CHANGE_PASSWORD,
  LOGIN_VOLUNTEER_RESET,
  LOGIN_VOLUNTEER_LOGIN_START,
  LOGIN_VOLUNTEER_LOGIN_SUCCESS,
  LOGIN_VOLUNTEER_LOGIN_FAILURE,
  LOGIN_VOLUNTEER_RESET_NOTIFICATION,
} from '../variables/constants/LoginVolunteerConstants'
import {postVolunteerLoginAPI} from '../api/LoginAPI'

export function volunteerLogin(volunteerLoginObject) {
  return function(dispatch) {
    dispatch(volunteerLoginStart())
    return postVolunteerLoginAPI(volunteerLoginObject)
      .then(json => {
        if (json.status) {
          sessionStorage.setItem('loginType', 'volunteer')
          sessionStorage.setItem('name', json.data[0].full_name)
          sessionStorage.setItem('id', json.data[0].id)
          dispatch(volunteerLoginSuccess())
        } else {
          dispatch(volunteerLoginFailure())
        }
      })
      .catch(err => {
        dispatch(volunteerLoginFailure())
      })
  }
}
function volunteerLoginStart() {
  return {
    type: LOGIN_VOLUNTEER_LOGIN_START
  }
}
function volunteerLoginSuccess() {
  return {
    type: LOGIN_VOLUNTEER_LOGIN_SUCCESS
  }
}
function volunteerLoginFailure() {
  return {
    type: LOGIN_VOLUNTEER_LOGIN_FAILURE
  }
}

export function changeEmail(value) {
  return {
    type: LOGIN_VOLUNTEER_CHANGE_EMAIL,
    value
  }
}
export function changePassword(value) {
  return {
    type: LOGIN_VOLUNTEER_CHANGE_PASSWORD,
    value
  }
}
export function reset() {
  return {
    type: LOGIN_VOLUNTEER_RESET
  }
}
export function resetNotification() {
  return {
    type: LOGIN_VOLUNTEER_RESET_NOTIFICATION
  }
}
