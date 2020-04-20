import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import EventJoin from '../views/EventJoin'
import MyEventsContainer from '../containers/MyEventsContainer'
import Profile from '../views/Profile'
import EventsMainContainer from '../containers/EventsMainContainer'
import EventsCreateContainer from '../containers/EventsCreateContainer'
import EventsEditContainer from '../containers/EventsEditContainer'
import VolunteersMainContainer from '../containers/VolunteersMainContainer'
import VolunteersCreateContainer from '../containers/VolunteersCreateContainer'
import Login from '../views/Login'
import LoginStaffContainer from '../containers/LoginStaffContainer'
import LoginVolunteerContainer from '../containers/LoginVolunteerContainer'
import RegisterVolunteer from '../views/RegisterVolunteer'
import DefaultReactApp from '../assets/js/App'
import CounterContainer from '../containers/CounterContainer'

const Routing = () => {
  const loginType = sessionStorage.getItem('loginType')

  if (loginType === 'volunteer') {
    return (
      <Switch>
        <Route exact path="/events" component={MyEventsContainer}/>
        <Route exact path="/joinevents" component={EventJoin}/>
        <Route exact path="/profile" component={Profile}/>

        {/* fall through */}
        <Route path="/" component={Fallthrough}/>
      </Switch>
    )
  } else if (loginType === 'staff') {
    return (
      <Switch>
        <Route path="/events/create" component={EventsCreateContainer}/>
        <Route path="/events/edit" component={EventsEditContainer}/>
        <Route exact path="/events" component={EventsMainContainer}/>

        <Route path="/volunteers/create" component={VolunteersCreateContainer}/>
        <Route path="/volunteers" component={VolunteersMainContainer}/>

        {/* fall through */}
        <Route path="/" component={Fallthrough}/>
      </Switch>
    )
  } else {
    return (
      <Switch>
        <Route path="/login/staff" component={LoginStaffContainer} />
        <Route path="/login/volunteer" component={LoginVolunteerContainer} />
        <Route exact path="/login" component={Login} />

        <Route exact path="/register" component={RegisterVolunteer} />

        <Route path="/" component={LoginFallthrough} />
      </Switch>
    )
  }
}

const LoginFallthrough = () => <Redirect to='/login'/>
const Fallthrough = () => <Redirect to="/events"/>

export default Routing
