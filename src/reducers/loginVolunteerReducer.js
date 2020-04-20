import {
  LOGIN_VOLUNTEER_CHANGE_EMAIL,
  LOGIN_VOLUNTEER_CHANGE_PASSWORD,
  LOGIN_VOLUNTEER_RESET,
  LOGIN_VOLUNTEER_LOGIN_START,
  LOGIN_VOLUNTEER_LOGIN_SUCCESS,
  LOGIN_VOLUNTEER_LOGIN_FAILURE,
  LOGIN_VOLUNTEER_RESET_NOTIFICATION,
} from '../variables/constants/LoginVolunteerConstants'

const initialState = {
  email: '',
  password: '',
  submitting: false,
  growlMessage: '',
}

export function loginVolunteerReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_VOLUNTEER_CHANGE_EMAIL:
      return {...state, email: action.value}
    case LOGIN_VOLUNTEER_CHANGE_PASSWORD:
      return {...state, password: action.value}
    case LOGIN_VOLUNTEER_LOGIN_START:
      return {...state, submitting: true}
    case LOGIN_VOLUNTEER_LOGIN_SUCCESS:
      return {...initialState, submitting: false, growlMessage: 'success'}
    case LOGIN_VOLUNTEER_LOGIN_FAILURE:
      return {...state, submitting: false, growlMessage: 'error'}
    case LOGIN_VOLUNTEER_RESET_NOTIFICATION:
      return {...state, growlMessage: ''}
    case LOGIN_VOLUNTEER_RESET:
      return initialState
    default:
      return state
  }
}
