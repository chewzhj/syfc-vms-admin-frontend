import React from 'react'
import {Route, Switch} from 'react-router-dom'
import DefaultReactApp from '../assets/js/App'
import CounterContainer from '../containers/CounterContainer'

const Routing = () => {
  return (
    <Switch>
      
      <Route path="/counter" component={CounterContainer}/>
      {/* fall through */}
      <Route path="/" component={DefaultReactApp}/>
    </Switch>
  )
}

export default Routing
