import {combineReducers} from 'redux'
import {counterReducer} from './counterReducer'
import {eventsCreateReducer} from './eventsCreateReducer'
import {eventsMainReducer} from './eventsMainReducer'

export default combineReducers({
  counter: counterReducer,
  eventsCreate: eventsCreateReducer,
  eventsMain: eventsMainReducer,
})
