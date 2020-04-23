import {
  PROFILE_CHANGE_PW_CHANGE_OLD_PW,
  PROFILE_CHANGE_PW_CHANGE_NEW_PW,
  PROFILE_CHANGE_PW_CHANGE_CNFM_PW,
  PROFILE_CHANGE_PW_DISCARD,
  PROFILE_CHANGE_PW_START,
  PROFILE_CHANGE_PW_SUCCESS,
  PROFILE_CHANGE_PW_FAILURE,
  PROFILE_CHANGE_PW_RESET_NOTIFICATION,
} from '../variables/constants/ProfileChangePasswordConstants'

const initialState = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
  submitting: false,
  growlMessage: '',
}

export function profileChangePasswordReducer(state = initialState, action) {
  switch (action.type) {
    case PROFILE_CHANGE_PW_CHANGE_OLD_PW:
      return {...state, oldPassword: action.value}
    case PROFILE_CHANGE_PW_CHANGE_NEW_PW:
      return {...state, newPassword: action.value}
    case PROFILE_CHANGE_PW_CHANGE_CNFM_PW:
      return {...state, confirmPassword: action.value}
    case PROFILE_CHANGE_PW_START:
      return {...state, submitting: true}
    case PROFILE_CHANGE_PW_SUCCESS:
      return {...state, submitting: false, growlMessage: 'success'}
    case PROFILE_CHANGE_PW_FAILURE:
      return {...state, submitting: false, growlMessage: 'error'}
    case PROFILE_CHANGE_PW_RESET_NOTIFICATION:
      return {...state, growlMessage: ''}
    case PROFILE_CHANGE_PW_DISCARD:
      return initialState
    default:
      return state
  }
}
