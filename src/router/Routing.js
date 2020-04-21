import React from 'react'
import '../assets/css/App.css';
import 'antd/dist/antd.css'
import {Route, Switch, Redirect} from 'react-router-dom'
import JoinEventsContainer from '../containers/JoinEventsContainer'
import MyEventsContainer from '../containers/MyEventsContainer'
import ProfileContainer from '../containers/ProfileContainer'
import EventsMainContainer from '../containers/EventsMainContainer'
import EventsCreateContainer from '../containers/EventsCreateContainer'
import EventsEditContainer from '../containers/EventsEditContainer'
import VolunteersMainContainer from '../containers/VolunteersMainContainer'
import VolunteersCreateContainer from '../containers/VolunteersCreateContainer'
import VolunteersEditContainer from '../containers/VolunteersEditContainer'
import Login from '../views/Login'
import LoginStaffContainer from '../containers/LoginStaffContainer'
import LoginVolunteerContainer from '../containers/LoginVolunteerContainer'
import RegisterVolunteerContainer from '../containers/RegisterVolunteerContainer'

const Routing = () => {
  const loginType = sessionStorage.getItem('loginType')

  if (loginType === 'volunteer') {
    return (
      <Switch>
        <Route exact path="/events" component={MyEventsContainer}/>
        <Route exact path="/joinevents" component={JoinEventsContainer}/>
        <Route exact path="/profile" component={ProfileContainer}/>

        {/* fall through */}
        <Route path="/" component={Fallthrough}/>
      </Switch>
    )
  } else if (loginType === 'staff') {
    return (
      <Switch>
        <Route exact path="/events/create" component={EventsCreateContainer}/>
        <Route exact path="/events/edit" component={EventsEditContainer}/>
        <Route exact path="/events" component={EventsMainContainer}/>

        <Route exact path="/volunteers/create" component={VolunteersCreateContainer}/>
        <Route exact path="/volunteers/edit" component={VolunteersEditContainer}/>
        <Route exact path="/volunteers" component={VolunteersMainContainer}/>
        <Route path="/volunteers" component={VolunteersFallthough}/>


        {/* fall through */}
        <Route path="/" component={Fallthrough}/>
      </Switch>
    )
  } else { // not logged in
    return (
      <Switch>
        <Route exact path="/login/staff" component={LoginStaffContainer} />
        <Route exact path="/login/volunteer" component={LoginVolunteerContainer} />
        <Route exact path="/login" component={Login} />

        <Route exact path="/register" component={RegisterVolunteerContainer} />

        <Route path="/" component={LoginFallthrough} />
      </Switch>
    )
  }
}

const LoginFallthrough = () => <Redirect to='/login'/>
const VolunteersFallthough = () => <Redirect to="/volunteers"/>
const Fallthrough = () => <Redirect to="/events"/>

export default Routing
