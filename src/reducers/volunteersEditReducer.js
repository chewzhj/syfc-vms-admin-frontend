import {
  VOL_EDIT_LOAD_VOL,
  VOL_EDIT_CHANGE_NAME,
  VOL_EDIT_CHANGE_EMAIL,
  VOL_EDIT_CHANGE_PASSWORD,
  VOL_EDIT_CHANGE_DOB,
  VOL_EDIT_CHANGE_NRIC,
  VOL_EDIT_CHANGE_ADDRESS,
  VOL_EDIT_CHANGE_POSTAL,
  VOL_EDIT_CHANGE_CHURCH,
  VOL_EDIT_CHANGE_DEPT,
  VOL_EDIT_CHANGE_GENDER,
  VOL_EDIT_CHANGE_NUMBER,
  VOL_EDIT_SUBMIT_START,
  VOL_EDIT_SUBMIT_SUCCESS,
  VOL_EDIT_SUBMIT_FAILURE,
  VOL_EDIT_RESET_NOTIFICATION,
  VOL_EDIT_DISCARD,
} from '../variables/constants/VolunteersEditConstants'

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

export function volunteersEditReducer(state = initialState, action) {
  switch (action.type) {
    case VOL_EDIT_LOAD_VOL:
      return {
        ...state,
        ...action.value,
        originalVolDetails: action.value
      }
    case VOL_EDIT_CHANGE_NAME:
      return {...state, name: action.value}
    case VOL_EDIT_CHANGE_EMAIL:
      return {...state, email: action.value}
    case VOL_EDIT_CHANGE_PASSWORD:
      return {...state, password: action.value}
    case VOL_EDIT_CHANGE_DOB:
      return {...state, dob: action.value}
    case VOL_EDIT_CHANGE_NRIC:
      return {...state, nric: action.value}
    case VOL_EDIT_CHANGE_ADDRESS:
      return {...state, address: action.value}
    case VOL_EDIT_CHANGE_POSTAL:
      return {...state, postal: action.value}
    case VOL_EDIT_CHANGE_CHURCH:
      return {...state, church: action.value}
    case VOL_EDIT_CHANGE_DEPT:
      return {...state, dept: action.value}
    case VOL_EDIT_CHANGE_GENDER:
      return {...state, gender: action.value}
    case VOL_EDIT_CHANGE_NUMBER:
      return {...state, number: action.value}
    case VOL_EDIT_SUBMIT_START:
      return {...state, submitting: true}
    case VOL_EDIT_SUBMIT_SUCCESS:
      return {...initialState, submitting: false, growlMessage: 'success'}
    case VOL_EDIT_SUBMIT_FAILURE:
      return {...state, submitting: false, growlMessage: 'error'}
    case VOL_EDIT_RESET_NOTIFICATION:
      return {...state, growlMessage: ''}
    case VOL_EDIT_DISCARD:
      return initialState
    default:
      return state
  }
}
