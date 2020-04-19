import {
  VOLUNTEERS_MAIN_RETRIEVE_VOLUNTEERS_START,
  VOLUNTEERS_MAIN_RETRIEVE_VOLUNTEERS_SUCCESS,
  VOLUNTEERS_MAIN_RETRIEVE_VOLUNTEERS_FAILURE,
} from '../variables/constants/VolunteersMainConstants'
import {getAllVolunteersAPI} from '../api/VolunteersAPI'

export function retrieveVolunteers() {
  return function(dispatch) {
    dispatch(retrieveVolunteersStart())
    return getAllVolunteersAPI()
      .then(json => {
        if (json.status === 200) {
          dispatch(retrieveVolunteersSuccess(json.data))
        } else {
          dispatch(retrieveVolunteersFailure())
        }
      })
      .catch(err => {
        dispatch(retrieveVolunteersFailure())
      })
  }
}

function retrieveVolunteersStart() {
  return {
    type: VOLUNTEERS_MAIN_RETRIEVE_VOLUNTEERS_START,
  }
}
function retrieveVolunteersSuccess(value) {
  return {
    type: VOLUNTEERS_MAIN_RETRIEVE_VOLUNTEERS_SUCCESS,
    value
  }
}
function retrieveVolunteersFailure() {
  return {
    type: VOLUNTEERS_MAIN_RETRIEVE_VOLUNTEERS_FAILURE,
  }
}
