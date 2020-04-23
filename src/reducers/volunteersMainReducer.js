import {
  VOLUNTEERS_MAIN_RETRIEVE_VOLUNTEERS_START,
  VOLUNTEERS_MAIN_RETRIEVE_VOLUNTEERS_SUCCESS,
  VOLUNTEERS_MAIN_RETRIEVE_VOLUNTEERS_FAILURE,
  VOLUNTEERS_MAIN_RETRIEVE_VOL_EVENTS_START,
  VOLUNTEERS_MAIN_RETRIEVE_VOL_EVENTS_SUCCESS,
  VOLUNTEERS_MAIN_RETRIEVE_VOL_EVENTS_FAILURE,
  VOLUNTEERS_MAIN_VE_MODAL_CLOSE,
} from '../variables/constants/VolunteersMainConstants'

const initialState = {
  volunteersLoading: false,
  volunteersList: [],
  volEventsLoading: false,
  viewVolunteerEvents: [],
  viewVolunteerId: '',
  veModalVisible: false,
}

export function volunteersMainReducer(state = initialState, action) {
  switch (action.type) {
    case VOLUNTEERS_MAIN_RETRIEVE_VOLUNTEERS_START:
      return {...state, volunteersLoading: true}
    case VOLUNTEERS_MAIN_RETRIEVE_VOLUNTEERS_SUCCESS:
      return {...state, volunteersLoading: false, volunteersList: action.value}
    case VOLUNTEERS_MAIN_RETRIEVE_VOLUNTEERS_FAILURE:
      return {...state, volunteersLoading: false}
    case VOLUNTEERS_MAIN_RETRIEVE_VOL_EVENTS_START:
      return {...state, volEventsLoading: true, viewVolunteerId: action.value}
    case VOLUNTEERS_MAIN_RETRIEVE_VOL_EVENTS_SUCCESS:
      return {...state, volEventsLoading: false, viewVolunteerEvents: action.value, veModalVisible: true}
    case VOLUNTEERS_MAIN_RETRIEVE_VOL_EVENTS_FAILURE:
      return {...state, volEventsLoading: false}
    case VOLUNTEERS_MAIN_VE_MODAL_CLOSE:
      return {...state, veModalVisible: false}
    default:
      return state
  }
}
