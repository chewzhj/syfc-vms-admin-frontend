import React from 'react'
import {Provider} from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'
import Routing from './Routing'

const Root = (props) => (
  <Provider store={props.store}>
    <Router>
      <Routing/>
    </Router>
  </Provider>
)

export default Root
