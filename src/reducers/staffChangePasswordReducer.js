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

const initialState = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
  submitting: false,
  growlMessage: '',
}

export function staffChangePasswordReducer(state = initialState, action) {
  switch (action.type) {
    case STAFF_CHANGE_PW_CHANGE_OLD_PW:
      return {...state, oldPassword: action.value}
    case STAFF_CHANGE_PW_CHANGE_NEW_PW:
      return {...state, newPassword: action.value}
    case STAFF_CHANGE_PW_CHANGE_CNFM_PW:
      return {...state, confirmPassword: action.value}
    case STAFF_CHANGE_PW_START:
      return {...state, submitting: true}
    case STAFF_CHANGE_PW_SUCCESS:
      return {...state, submitting: false, growlMessage: 'success'}
    case STAFF_CHANGE_PW_FAILURE:
      return {...state, submitting: false, growlMessage: 'error'}
    case STAFF_CHANGE_PW_RESET_NOTIFICATION:
      return {...state, growlMessage: ''}
    case STAFF_CHANGE_PW_DISCARD:
      return initialState
    default:
      return state
  }
}
