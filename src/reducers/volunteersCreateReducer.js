import {
  VOL_CREATE_CHANGE_NAME,
  VOL_CREATE_CHANGE_EMAIL,
  VOL_CREATE_CHANGE_PASSWORD,
  VOL_CREATE_CHANGE_DOB,
  VOL_CREATE_CHANGE_NRIC,
  VOL_CREATE_CHANGE_ADDRESS,
  VOL_CREATE_CHANGE_POSTAL,
  VOL_CREATE_CHANGE_CHURCH,
  VOL_CREATE_CHANGE_DEPT,
  VOL_CREATE_CHANGE_GENDER,
  VOL_CREATE_CHANGE_NUMBER,
  VOL_CREATE_SUBMIT_START,
  VOL_CREATE_SUBMIT_SUCCESS,
  VOL_CREATE_SUBMIT_FAILURE,
  VOL_CREATE_RESET_NOTIFICATION,
  VOL_CREATE_DISCARD,
} from '../variables/constants/VolunteersCreateConstants'

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

export function volunteersCreateReducer(state = initialState, action) {
  switch (action.type) {
    case VOL_CREATE_CHANGE_NAME:
      return {...state, name: action.value}
    case VOL_CREATE_CHANGE_EMAIL:
      return {...state, email: action.value}
    case VOL_CREATE_CHANGE_PASSWORD:
      return {...state, password: action.value}
    case VOL_CREATE_CHANGE_DOB:
      return {...state, dob: action.value}
    case VOL_CREATE_CHANGE_NRIC:
      return {...state, nric: action.value}
    case VOL_CREATE_CHANGE_ADDRESS:
      return {...state, address: action.value}
    case VOL_CREATE_CHANGE_POSTAL:
      return {...state, postal: action.value}
    case VOL_CREATE_CHANGE_CHURCH:
      return {...state, church: action.value}
    case VOL_CREATE_CHANGE_DEPT:
      return {...state, dept: action.value}
    case VOL_CREATE_CHANGE_GENDER:
      return {...state, gender: action.value}
    case VOL_CREATE_CHANGE_NUMBER:
      return {...state, number: action.value}
    case VOL_CREATE_SUBMIT_START:
      return {...state, submitting: true}
    case VOL_CREATE_SUBMIT_SUCCESS:
      return {...initialState, submitting: false, growlMessage: 'success'}
    case VOL_CREATE_SUBMIT_FAILURE:
      return {...state, submitting: false, growlMessage: 'error'}
    case VOL_CREATE_RESET_NOTIFICATION:
      return {...state, growlMessage: ''}
    case VOL_CREATE_DISCARD:
      return initialState
    default:
      return state
  }
}
