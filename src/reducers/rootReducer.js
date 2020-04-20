import {combineReducers} from 'redux'
import {loginStaffReducer} from './loginStaffReducer'
import {loginVolunteerReducer} from './loginVolunteerReducer'
import {eventsCreateReducer} from './eventsCreateReducer'
import {eventsEditReducer} from './eventsEditReducer'
import {eventsMainReducer} from './eventsMainReducer'
import {volunteersCreateReducer} from './volunteersCreateReducer'
import {volunteersMainReducer} from './volunteersMainReducer'
import {counterReducer} from './counterReducer'

export default combineReducers({
  loginStaff: loginStaffReducer,
  loginVolunteer: loginVolunteerReducer,
  eventsCreate: eventsCreateReducer,
  eventsEdit: eventsEditReducer,
  eventsMain: eventsMainReducer,
  volunteersCreate: volunteersCreateReducer,
  volunteersMain: volunteersMainReducer,
  counter: counterReducer,
})
