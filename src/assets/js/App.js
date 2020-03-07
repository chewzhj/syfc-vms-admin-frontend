import React from 'react';
import logo from '../img/react-logo.svg';
import {Link} from 'react-router-dom'
import '../css/App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Link
          className="App-link"
          to="/counter"
        >
          Counter Example
        </Link>
      </header>
    </div>
  );
}

export default App;
