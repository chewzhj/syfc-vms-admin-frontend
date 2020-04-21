import {
  VOL_EDIT_LOAD_VOL,
  VOL_EDIT_CHANGE_NAME,
  VOL_EDIT_CHANGE_EMAIL,
  VOL_EDIT_CHANGE_PASSWORD,
  VOL_EDIT_CHANGE_DOB,
  VOL_EDIT_CHANGE_NRIC,
  VOL_EDIT_CHANGE_ADDRESS,
  VOL_EDIT_CHANGE_POSTAL,
  VOL_EDIT_CHANGE_CHURCH,
  VOL_EDIT_CHANGE_DEPT,
  VOL_EDIT_CHANGE_GENDER,
  VOL_EDIT_CHANGE_NUMBER,
  VOL_EDIT_SUBMIT_START,
  VOL_EDIT_SUBMIT_SUCCESS,
  VOL_EDIT_SUBMIT_FAILURE,
  VOL_EDIT_RESET_NOTIFICATION,
  VOL_EDIT_DISCARD,
} from '../variables/constants/VolunteersEditConstants'
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
    type: VOL_EDIT_SUBMIT_START
  }
}
function editVolSuccess() {
  return {
    type: VOL_EDIT_SUBMIT_SUCCESS
  }
}
function editVolFailure() {
  return {
    type: VOL_EDIT_SUBMIT_FAILURE
  }
}

export function loadVolunteer(value) {
  return {
    type: VOL_EDIT_LOAD_VOL,
    value
  }
}
export function changeName(value) {
  return {
    type: VOL_EDIT_CHANGE_NAME,
    value
  }
}
export function changeEmail(value) {
  return {
    type: VOL_EDIT_CHANGE_EMAIL,
    value
  }
}
export function changePassword(value) {
  return {
    type: VOL_EDIT_CHANGE_PASSWORD,
    value
  }
}
export function changeDob(value) {
  return {
    type: VOL_EDIT_CHANGE_DOB,
    value
  }
}
export function changeNRIC(value) {
  return {
    type: VOL_EDIT_CHANGE_NRIC,
    value
  }
}
export function changeAddress(value) {
  return {
    type: VOL_EDIT_CHANGE_ADDRESS,
    value
  }
}
export function changePostal(value) {
  return {
    type: VOL_EDIT_CHANGE_POSTAL,
    value
  }
}
export function changeChurch(value) {
  return {
    type: VOL_EDIT_CHANGE_CHURCH,
    value
  }
}
export function changeDept(value) {
  return {
    type: VOL_EDIT_CHANGE_DEPT,
    value
  }
}
export function changeGender(value) {
  return {
    type: VOL_EDIT_CHANGE_GENDER,
    value
  }
}
export function changeNumber(value) {
  return {
    type: VOL_EDIT_CHANGE_NUMBER,
    value
  }
}
export function resetNotification() {
  return {
    type: VOL_EDIT_RESET_NOTIFICATION
  }
}
export function discard() {
  return {
    type: VOL_EDIT_DISCARD
  }
}
