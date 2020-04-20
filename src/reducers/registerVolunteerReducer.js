import {
  REGISTER_VOL_CHANGE_NAME,
  REGISTER_VOL_CHANGE_EMAIL,
  REGISTER_VOL_CHANGE_PASSWORD,
  REGISTER_VOL_CHANGE_DOB,
  REGISTER_VOL_CHANGE_NRIC,
  REGISTER_VOL_CHANGE_ADDRESS,
  REGISTER_VOL_CHANGE_POSTAL,
  REGISTER_VOL_CHANGE_CHURCH,
  REGISTER_VOL_CHANGE_DEPT,
  REGISTER_VOL_CHANGE_GENDER,
  REGISTER_VOL_CHANGE_NUMBER,
  REGISTER_VOL_SUBMIT_START,
  REGISTER_VOL_SUBMIT_SUCCESS,
  REGISTER_VOL_SUBMIT_FAILURE,
  REGISTER_VOL_RESET_NOTIFICATION,
  REGISTER_VOL_DISCARD,
} from '../variables/constants/RegisterVolunteerConstants'

const initialState = {
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

export function registerVolunteerReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_VOL_CHANGE_NAME:
      return {...state, name: action.value}
    case REGISTER_VOL_CHANGE_EMAIL:
      return {...state, email: action.value}
    case REGISTER_VOL_CHANGE_PASSWORD:
      return {...state, password: action.value}
    case REGISTER_VOL_CHANGE_DOB:
      return {...state, dob: action.value}
    case REGISTER_VOL_CHANGE_NRIC:
      return {...state, nric: action.value}
    case REGISTER_VOL_CHANGE_ADDRESS:
      return {...state, address: action.value}
    case REGISTER_VOL_CHANGE_POSTAL:
      return {...state, postal: action.value}
    case REGISTER_VOL_CHANGE_CHURCH:
      return {...state, church: action.value}
    case REGISTER_VOL_CHANGE_DEPT:
      return {...state, dept: action.value}
    case REGISTER_VOL_CHANGE_GENDER:
      return {...state, gender: action.value}
    case REGISTER_VOL_CHANGE_NUMBER:
      return {...state, number: action.value}
    case REGISTER_VOL_SUBMIT_START:
      return {...state, submitting: true}
    case REGISTER_VOL_SUBMIT_SUCCESS:
      return {...initialState, submitting: false, growlMessage: 'success'}
    case REGISTER_VOL_SUBMIT_FAILURE:
      return {...state, submitting: false, growlMessage: 'error'}
    case REGISTER_VOL_RESET_NOTIFICATION:
      return {...state, growlMessage: ''}
    case REGISTER_VOL_DISCARD:
      return initialState
    default:
      return state
  }
}
