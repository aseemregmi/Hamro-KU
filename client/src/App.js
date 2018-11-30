import React, { Component } from 'react';
import './sass/main.scss';

import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';
import Nav from './components/nav/Nav';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        {/* <Login /> */}
        <SignUp />
      </div>
    );
  }
}

export default App;
