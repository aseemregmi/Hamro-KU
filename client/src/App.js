import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './sass/main.scss';

import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';
import Nav from './components/nav/Nav';
import Footer from './components/nav/Footer';
import Explore from './components/pages/Explore';
import Home from './components/pages/Home';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/explore" component={Explore} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
