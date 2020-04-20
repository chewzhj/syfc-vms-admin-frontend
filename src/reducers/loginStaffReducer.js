import {
  LOGIN_STAFF_CHANGE_USERNAME,
  LOGIN_STAFF_CHANGE_PASSWORD,
  LOGIN_STAFF_RESET,
  LOGIN_STAFF_LOGIN_START,
  LOGIN_STAFF_LOGIN_SUCCESS,
  LOGIN_STAFF_LOGIN_FAILURE,
  LOGIN_STAFF_RESET_NOTIFICATION,
} from '../variables/constants/LoginStaffConstants'

const initialState = {
  username: '',
  password: '',
  submitting: false,
  growlMessage: '',
}

export function loginStaffReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_STAFF_CHANGE_USERNAME:
      return {...state, username: action.value}
    case LOGIN_STAFF_CHANGE_PASSWORD:
      return {...state, password: action.value}
    case LOGIN_STAFF_LOGIN_START:
      return {...state, submitting: true}
    case LOGIN_STAFF_LOGIN_SUCCESS:
      return {...initialState, submitting: false, growlMessage: 'success'}
    case LOGIN_STAFF_LOGIN_FAILURE:
      return {...state, submitting: false, growlMessage: 'error'}
    case LOGIN_STAFF_RESET_NOTIFICATION:
      return {...state, growlMessage: ''}
    case LOGIN_STAFF_RESET:
      return initialState
    default:
      return state
  }
}
