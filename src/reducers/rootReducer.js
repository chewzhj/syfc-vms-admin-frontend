import {combineReducers} from 'redux'
import {counterReducer} from './counterReducer'
import {eventsCreateReducer} from './eventsCreateReducer'
import {eventsEditReducer} from './eventsEditReducer'
import {eventsMainReducer} from './eventsMainReducer'
import {volunteersCreateReducer} from './volunteersCreateReducer'
import {volunteersMainReducer} from './volunteersMainReducer'

export default combineReducers({
  counter: counterReducer,
  eventsCreate: eventsCreateReducer,
  eventsEdit: eventsEditReducer,
  eventsMain: eventsMainReducer,
  volunteersCreate: volunteersCreateReducer,
  volunteersMain: volunteersMainReducer,
})
