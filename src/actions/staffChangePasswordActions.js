import {
  STAFF_CHANGE_PW_CHANGE_OLD_PW,
  STAFF_CHANGE_PW_CHANGE_NEW_PW,
  STAFF_CHANGE_PW_CHANGE_CNFM_PW,
  STAFF_CHANGE_PW_DISCARD,
  STAFF_CHANGE_PW_START,
  STAFF_CHANGE_PW_SUCCESS,
  STAFF_CHANGE_PW_FAILURE,
  STAFF_CHANGE_PW_RESET_NOTIFICATION,
} from '../variables/constants/StaffChangePasswordConstants'
import {postChangeStaffPasswordAPI} from '../api/StaffAPI'

export function postChangePassword(passwordObject) {
  return function(dispatch) {
    dispatch(changeStart())
    return postChangeStaffPasswordAPI(passwordObject)
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
    type: STAFF_CHANGE_PW_START,
  }
}
function changeSuccess() {
  return {
    type: STAFF_CHANGE_PW_SUCCESS,
  }
}
function changeFailure() {
  return {
    type: STAFF_CHANGE_PW_FAILURE,
  }
}

export function changeOldPassword(value) {
  return {
    type: STAFF_CHANGE_PW_CHANGE_OLD_PW,
    value
  }
}
export function changeNewPassword(value) {
  return {
    type: STAFF_CHANGE_PW_CHANGE_NEW_PW,
    value
  }
}
export function changeConfirmPassword(value) {
  return {
    type: STAFF_CHANGE_PW_CHANGE_CNFM_PW,
    value
  }
}
export function discard() {
  return {
    type: STAFF_CHANGE_PW_DISCARD
  }
}
export function resetNotification() {
  return {
    type: STAFF_CHANGE_PW_RESET_NOTIFICATION
  }
}
