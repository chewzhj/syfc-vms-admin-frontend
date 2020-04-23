import {
  PROFILE_CHANGE_PW_CHANGE_OLD_PW,
  PROFILE_CHANGE_PW_CHANGE_NEW_PW,
  PROFILE_CHANGE_PW_CHANGE_CNFM_PW,
  PROFILE_CHANGE_PW_DISCARD,
  PROFILE_CHANGE_PW_START,
  PROFILE_CHANGE_PW_SUCCESS,
  PROFILE_CHANGE_PW_FAILURE,
  PROFILE_CHANGE_PW_RESET_NOTIFICATION,
} from '../variables/constants/ProfileChangePasswordConstants'
import {postChangePasswordAPI} from '../api/VolunteersAPI'

export function postChangePassword(passwordObject) {
  return function(dispatch) {
    dispatch(changeStart())
    return postChangePasswordAPI(passwordObject)
      .then(res => {
        if (res.status) {
          dispatch(changeSuccess())
        } else {
          dispatch(changeFailure())
        }
      })
      .catch(e => {
        dispatch(changeFailure())
      })
  }
}
function changeStart() {
  return {
    type: PROFILE_CHANGE_PW_START,
  }
}
function changeSuccess() {
  return {
    type: PROFILE_CHANGE_PW_SUCCESS,
  }
}
function changeFailure() {
  return {
    type: PROFILE_CHANGE_PW_FAILURE,
  }
}

export function changeOldPassword(value) {
  return {
    type: PROFILE_CHANGE_PW_CHANGE_OLD_PW,
    value
  }
}
export function changeNewPassword(value) {
  return {
    type: PROFILE_CHANGE_PW_CHANGE_NEW_PW,
    value
  }
}
export function changeConfirmPassword(value) {
  return {
    type: PROFILE_CHANGE_PW_CHANGE_CNFM_PW,
    value
  }
}
export function discard() {
  return {
    type: PROFILE_CHANGE_PW_DISCARD
  }
}
export function resetNotification() {
  return {
    type: PROFILE_CHANGE_PW_RESET_NOTIFICATION
  }
}
