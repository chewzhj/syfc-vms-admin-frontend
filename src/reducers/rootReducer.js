import {combineReducers} from 'redux'
import {loginStaffReducer} from './loginStaffReducer'
import {loginVolunteerReducer} from './loginVolunteerReducer'
import {registerVolunteerReducer} from './registerVolunteerReducer'
import {eventsCreateReducer} from './eventsCreateReducer'
import {eventsEditReducer} from './eventsEditReducer'
import {eventsMainReducer} from './eventsMainReducer'
import {volunteersCreateReducer} from './volunteersCreateReducer'
import {volunteersEditReducer} from './volunteersEditReducer'
import {volunteersMainReducer} from './volunteersMainReducer'
import {joinEventsReducer} from './joinEventsReducer'
import {myEventsReducer} from './myEventsReducer'
import {profileReducer} from './profileReducer'
import {profileEditReducer} from './profileEditReducer'
import {profileChangePasswordReducer} from './profileChangePasswordReducer'
import {staffChangePasswordReducer} from './staffChangePasswordReducer'
import {counterReducer} from './counterReducer'

export default combineReducers({
  loginStaff: loginStaffReducer,
  loginVolunteer: loginVolunteerReducer,
  registerVolunteer: registerVolunteerReducer,
  eventsCreate: eventsCreateReducer,
  eventsEdit: eventsEditReducer,
  eventsMain: eventsMainReducer,
  volunteersCreate: volunteersCreateReducer,
  volunteersEdit: volunteersEditReducer,
  volunteersMain: volunteersMainReducer,
  joinEvents: joinEventsReducer,
  myEvents: myEventsReducer,
  profile: profileReducer,
  profileEdit: profileEditReducer,
  profileChangePassword: profileChangePasswordReducer,
  staffChangePassword: staffChangePasswordReducer,
  counter: counterReducer,
})
