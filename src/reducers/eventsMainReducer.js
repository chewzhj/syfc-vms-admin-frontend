import {
  EVENTS_MAIN_RETRIEVE_EVENTS_START,
  EVENTS_MAIN_RETRIEVE_EVENTS_SUCCESS,
  EVENTS_MAIN_RETRIEVE_EVENTS_FAILURE,
  EVENTS_MAIN_RETRIEVE_EVENT_VOL_START,
  EVENTS_MAIN_RETRIEVE_EVENT_VOL_SUCCESS,
  EVENTS_MAIN_RETRIEVE_EVENT_VOL_FAILURE,
  EVENTS_MAIN_RETRIEVE_EVENT_PIC_START,
  EVENTS_MAIN_RETRIEVE_EVENT_PIC_SUCCESS,
  EVENTS_MAIN_RETRIEVE_EVENT_PIC_FAILURE,
  EVENTS_MAIN_EV_MODAL_CLOSE,
} from '../variables/constants/EventsMainConstants'

const initialState = {
  eventsLoading: false,
  eventsList: [],
  selectedEvent: '',
  eventPictureLoading: false,
  eventPicture: null,
  eventVolLoading: false,
  eventVolList: [],
  evModalVisible: false,
}

export function eventsMainReducer(state = initialState, action) {
  switch (action.type) {
    case EVENTS_MAIN_RETRIEVE_EVENTS_START:
      return {...state, eventsLoading: true}
    case EVENTS_MAIN_RETRIEVE_EVENTS_SUCCESS:
      return {...state, eventsLoading: false, eventsList: action.value}
    case EVENTS_MAIN_RETRIEVE_EVENTS_FAILURE:
      return {...state, eventsLoading: false}
    case EVENTS_MAIN_RETRIEVE_EVENT_VOL_START:
      return {...state, eventVolLoading: true, selectedEvent: action.value}
    case EVENTS_MAIN_RETRIEVE_EVENT_VOL_SUCCESS:
      return {...state, eventVolLoading: false, eventVolList: action.value, evModalVisible: true}
    case EVENTS_MAIN_RETRIEVE_EVENT_VOL_FAILURE:
      return {...state, eventVolLoading: false}
    case EVENTS_MAIN_RETRIEVE_EVENT_PIC_START:
      return {...state, eventPictureLoading: true}
    case EVENTS_MAIN_RETRIEVE_EVENT_PIC_SUCCESS:
      return {...state, eventPicture: action.value, eventPictureLoading: false}
    case EVENTS_MAIN_RETRIEVE_EVENT_PIC_FAILURE:
      return {...state, eventPictureLoading: false}
    case EVENTS_MAIN_EV_MODAL_CLOSE:
      return {...state, evModalVisible: false, eventPicture: null, selectedEvent: '', eventVolList: []}
    default:
      return state
  }
}
