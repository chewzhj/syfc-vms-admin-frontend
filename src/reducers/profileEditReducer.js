import {
  PROFILE_EDIT_LOAD_VOL,
  PROFILE_EDIT_CHANGE_NAME,
  PROFILE_EDIT_CHANGE_EMAIL,
  PROFILE_EDIT_CHANGE_PASSWORD,
  PROFILE_EDIT_CHANGE_DOB,
  PROFILE_EDIT_CHANGE_NRIC,
  PROFILE_EDIT_CHANGE_ADDRESS,
  PROFILE_EDIT_CHANGE_POSTAL,
  PROFILE_EDIT_CHANGE_CHURCH,
  PROFILE_EDIT_CHANGE_DEPT,
  PROFILE_EDIT_CHANGE_GENDER,
  PROFILE_EDIT_CHANGE_NUMBER,
  PROFILE_EDIT_SUBMIT_START,
  PROFILE_EDIT_SUBMIT_SUCCESS,
  PROFILE_EDIT_SUBMIT_FAILURE,
  PROFILE_EDIT_RESET_NOTIFICATION,
  PROFILE_EDIT_DISCARD,
} from '../variables/constants/ProfileEditConstants'

const initialState = {
  originalVolDetails: {},
  name: '',
  email: '',
  password: '',
  dob: null,
  nric: '',
  address: '',
  postal: '',
  church: '',
  dept: '',
  gender: 'M',
  number: '',
  submitting: false,
  growlMessage: '',
}

export function profileEditReducer(state = initialState, action) {
  switch (action.type) {
    case PROFILE_EDIT_LOAD_VOL:
      return {
        ...state,
        ...action.value,
        originalVolDetails: action.value
      }
    case PROFILE_EDIT_CHANGE_NAME:
      return {...state, name: action.value}
    case PROFILE_EDIT_CHANGE_EMAIL:
      return {...state, email: action.value}
    case PROFILE_EDIT_CHANGE_PASSWORD:
      return {...state, password: action.value}
    case PROFILE_EDIT_CHANGE_DOB:
      return {...state, dob: action.value}
    case PROFILE_EDIT_CHANGE_NRIC:
      return {...state, nric: action.value}
    case PROFILE_EDIT_CHANGE_ADDRESS:
      return {...state, address: action.value}
    case PROFILE_EDIT_CHANGE_POSTAL:
      return {...state, postal: action.value}
    case PROFILE_EDIT_CHANGE_CHURCH:
      return {...state, church: action.value}
    case PROFILE_EDIT_CHANGE_DEPT:
      return {...state, dept: action.value}
    case PROFILE_EDIT_CHANGE_GENDER:
      return {...state, gender: action.value}
    case PROFILE_EDIT_CHANGE_NUMBER:
      return {...state, number: action.value}
    case PROFILE_EDIT_SUBMIT_START:
      return {...state, submitting: true}
    case PROFILE_EDIT_SUBMIT_SUCCESS:
      return {...initialState, submitting: false, growlMessage: 'success'}
    case PROFILE_EDIT_SUBMIT_FAILURE:
      return {...state, submitting: false, growlMessage: 'error'}
    case PROFILE_EDIT_RESET_NOTIFICATION:
      return {...state, growlMessage: ''}
    case PROFILE_EDIT_DISCARD:
      return initialState
    default:
      return state
  }
}
