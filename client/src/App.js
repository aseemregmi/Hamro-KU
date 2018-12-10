import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './sass/main.scss';

import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';
import Nav from './components/nav/Nav';
import Footer from './components/nav/Footer';
import Explore from './components/pages/Explore';
import Home from './components/pages/Home';
import Dashboard from './components/pages/Dashboard';
import { Provider } from './context';
import isAuthenticated from './components/hocs/isAuthenticated';
import isAuthenticatedAsAdmin from './components/hocs/isAuthenticatedAsAdmin';
import isNotAuthenticated from './components/hocs/isNotAuthenticated';
import passAuthProps from './components/hocs/passAuthProps';
import AdminPanel from './components/pages/AdminPanel';

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <div className="App">
            <Nav />
            <Switch>
              <Route exact path="/" component={passAuthProps(Home)} />
              <Route
                exact
                path="/login"
                component={isNotAuthenticated(Login)}
              />
              <Route
                exact
                path="/signup"
                component={isNotAuthenticated(SignUp)}
              />
              <Route exact path="/explore" component={Explore} />
              <Route
                exact
                path="/dashboard"
                component={isAuthenticated(Dashboard)}
              />
              <Route
                path="/dashboard/:option"
                component={isAuthenticated(Dashboard)}
              />
              <Route
                path="/admin-panel"
                component={isAuthenticatedAsAdmin(AdminPanel)}
              />
              <Route
                path="/admin-panel/:options"
                component={isAuthenticatedAsAdmin(AdminPanel)}
              />
            </Switch>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
