import {
  VOLUNTEERS_MAIN_RETRIEVE_VOLUNTEERS_START,
  VOLUNTEERS_MAIN_RETRIEVE_VOLUNTEERS_SUCCESS,
  VOLUNTEERS_MAIN_RETRIEVE_VOLUNTEERS_FAILURE,
} from '../variables/constants/VolunteersMainConstants'

const initialState = {
  volunteersLoading: false,
  volunteersList: [],
}

export function volunteersMainReducer(state = initialState, action) {
  switch (action.type) {
    case VOLUNTEERS_MAIN_RETRIEVE_VOLUNTEERS_START:
      return {...state, volunteersLoading: true}
    case VOLUNTEERS_MAIN_RETRIEVE_VOLUNTEERS_SUCCESS:
      return {...state, volunteersLoading: false, volunteersList: action.value}
    case VOLUNTEERS_MAIN_RETRIEVE_VOLUNTEERS_FAILURE:
      return {...state, volunteersLoading: false}
    default:
      return state
  }
}
