import {
  MY_PROFILE_LOAD_START,
  MY_PROFILE_LOAD_SUCCESS,
  MY_PROFILE_LOAD_FAILURE,
} from '../variables/constants/ProfileConstants'
import {getProfileAPI} from '../api/VolunteersAPI'

export function getProfile() {
  return function(dispatch) {
    dispatch(getProfileStart())
    return getProfileAPI()
      .then(json => {
        if (json.status === 200) {
          dispatch(getProfileSuccess(json.data))
        } else {
          dispatch(getProfileFailure())
        }
      })
      .catch(err => {
        dispatch(getProfileFailure())
      })
  }
}

function getProfileStart() {
  return {
    type: MY_PROFILE_LOAD_START,
  }
}
function getProfileSuccess(value) {
  return {
    type: MY_PROFILE_LOAD_SUCCESS,
    value
  }
}
function getProfileFailure() {
  return {
    type: MY_PROFILE_LOAD_FAILURE,
  }
}
