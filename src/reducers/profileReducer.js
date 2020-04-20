import {
  MY_PROFILE_LOAD_START,
  MY_PROFILE_LOAD_SUCCESS,
  MY_PROFILE_LOAD_FAILURE,
} from '../variables/constants/ProfileConstants'

const initialState = {
  profileLoading: false,
  profileObject: {},
}

export function profileReducer(state = initialState, action) {
  switch (action.type) {
    case MY_PROFILE_LOAD_START:
      return {...state, profileLoading: true}
    case MY_PROFILE_LOAD_SUCCESS:
      return {...state, profileLoading: false, profileObject: action.value}
    case MY_PROFILE_LOAD_FAILURE:
      return {...state, profileLoading: false}
    default:
      return state
  }
}
