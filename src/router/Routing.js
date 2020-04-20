import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import EventsMainContainer from '../containers/EventsMainContainer'
import EventsCreateContainer from '../containers/EventsCreateContainer'
import EventsEditContainer from '../containers/EventsEditContainer'
import VolunteersMainContainer from '../containers/VolunteersMainContainer'
import VolunteersCreateContainer from '../containers/VolunteersCreateContainer'
import Login from '../views/Login'
import LoginStaff from '../views/LoginStaff'
import LoginVolunteer from '../views/LoginVolunteer'
import RegisterVolunteer from '../views/RegisterVolunteer'
import DefaultReactApp from '../assets/js/App'
import CounterContainer from '../containers/CounterContainer'

const Routing = () => {
  return (
    <Switch>

      <Route path="/login/staff" component={LoginStaff} />
      <Route path="/login/volunteer" component={LoginVolunteer} />
      <Route path="/login" component={Login} />
      
      <Route path="/register" component={RegisterVolunteer} />

      <Route path="/events/create" component={EventsCreateContainer}/>
      <Route path="/events/edit" component={EventsEditContainer}/>
      <Route path="/events" component={EventsMainContainer}/>

      <Route path="/volunteers/create" component={VolunteersCreateContainer}/>
      <Route path="/volunteers" component={VolunteersMainContainer}/>

      {/* fall through */}
      <Route path="/" component={Fallthrough}/>
    </Switch>
  )
}

const Fallthrough = () => <Redirect to="/events"/>

export default Routing
