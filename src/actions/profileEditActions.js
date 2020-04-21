import {
  PROFILE_EDIT_LOAD_VOL,
  PROFILE_EDIT_CHANGE_NAME,
  PROFILE_EDIT_CHANGE_EMAIL,
  PROFILE_EDIT_CHANGE_PASSWORD,
  PROFILE_EDIT_CHANGE_DOB,
  PROFILE_EDIT_CHANGE_NRIC,
  PROFILE_EDIT_CHANGE_ADDRESS,
  PROFILE_EDIT_CHANGE_POSTAL,
  PROFILE_EDIT_CHANGE_CHURCH,
  PROFILE_EDIT_CHANGE_DEPT,
  PROFILE_EDIT_CHANGE_GENDER,
  PROFILE_EDIT_CHANGE_NUMBER,
  PROFILE_EDIT_SUBMIT_START,
  PROFILE_EDIT_SUBMIT_SUCCESS,
  PROFILE_EDIT_SUBMIT_FAILURE,
  PROFILE_EDIT_RESET_NOTIFICATION,
  PROFILE_EDIT_DISCARD,
} from '../variables/constants/ProfileEditConstants'
import { postUpdateVolunteerAPI } from '../api/VolunteersAPI'

export function editVolunteer(volId, volunteerObject) {
  return function(dispatch) {
    dispatch(editVolStart())
    return postUpdateVolunteerAPI(volId, volunteerObject)
      .then(json => {
        if (json.status) {
          dispatch(editVolSuccess())
        } else {
          dispatch(editVolFailure())
        }
      })
      .catch(err => {
        dispatch(editVolFailure())
      })
  }
}
function editVolStart() {
  return {
    type: PROFILE_EDIT_SUBMIT_START
  }
}
function editVolSuccess() {
  return {
    type: PROFILE_EDIT_SUBMIT_SUCCESS
  }
}
function editVolFailure() {
  return {
    type: PROFILE_EDIT_SUBMIT_FAILURE
  }
}

export function loadVolunteer(value) {
  return {
    type: PROFILE_EDIT_LOAD_VOL,
    value
  }
}
export function changeName(value) {
  return {
    type: PROFILE_EDIT_CHANGE_NAME,
    value
  }
}
export function changeEmail(value) {
  return {
    type: PROFILE_EDIT_CHANGE_EMAIL,
    value
  }
}
export function changePassword(value) {
  return {
    type: PROFILE_EDIT_CHANGE_PASSWORD,
    value
  }
}
export function changeDob(value) {
  return {
    type: PROFILE_EDIT_CHANGE_DOB,
    value
  }
}
export function changeNRIC(value) {
  return {
    type: PROFILE_EDIT_CHANGE_NRIC,
    value
  }
}
export function changeAddress(value) {
  return {
    type: PROFILE_EDIT_CHANGE_ADDRESS,
    value
  }
}
export function changePostal(value) {
  return {
    type: PROFILE_EDIT_CHANGE_POSTAL,
    value
  }
}
export function changeChurch(value) {
  return {
    type: PROFILE_EDIT_CHANGE_CHURCH,
    value
  }
}
export function changeDept(value) {
  return {
    type: PROFILE_EDIT_CHANGE_DEPT,
    value
  }
}
export function changeGender(value) {
  return {
    type: PROFILE_EDIT_CHANGE_GENDER,
    value
  }
}
export function changeNumber(value) {
  return {
    type: PROFILE_EDIT_CHANGE_NUMBER,
    value
  }
}
export function resetNotification() {
  return {
    type: PROFILE_EDIT_RESET_NOTIFICATION
  }
}
export function discard() {
  return {
    type: PROFILE_EDIT_DISCARD
  }
}
