import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import EventsMainContainer from '../containers/EventsMainContainer'
import EventsCreateContainer from '../containers/EventsCreateContainer'
import EventsEditContainer from '../containers/EventsEditContainer'
import VolunteersMain from '../views/VolunteersMain'
import VolunteersCreate from '../views/VolunteersCreate'
import Login from '../views/Login'
import DefaultReactApp from '../assets/js/App'
import CounterContainer from '../containers/CounterContainer'

const Routing = () => {
  return (
    <Switch>

      <Route path="/login" component={Login} />

      <Route path="/events/create" component={EventsCreateContainer}/>
      <Route path="/events/edit" component={EventsEditContainer}/>
      <Route path="/events" component={EventsMainContainer}/>

      <Route path="/volunteers/create" component={VolunteersCreate}/>
      <Route path="/volunteers" component={VolunteersMain}/>

      {/* fall through */}
      <Route path="/" component={Fallthrough}/>
    </Switch>
  )
}

const Fallthrough = () => <Redirect to="/events"/>

export default Routing
