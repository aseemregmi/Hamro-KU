import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import passAuthProps from './../hocs/passAuthProps';
import axios from 'axios';

class NavBar extends Component {
  state = {
    loggedIn: false,
    authType: null
  };

  static getDerivedStateFromProps(props) {
    if (props.auth) {
      const loggedIn = props.auth ? true : false;
      const authType = props.auth.type;
      return {
        loggedIn,
        authType
      };
    } else {
      return {};
    }
  }

  handleLogout = async () => {
    try {
      await axios.post('/api/tokens/delete', {
        token: this.props.auth.token
      });
      this.props.dispatch({ type: 'LOGOUT' });
      this.setState({ loggedIn: false, authType: null });
    } catch (err) {
      alert(err);
    }
  };

  render() {
    return (
      <nav className="nav">
        <Link to="/" className="nav__title">
          Hamro-KU
        </Link>
        <div style={{ flex: 1 }} />
        <div className="nav__buttons">
          {this.state.authType === 'admin' ? (
            <React.Fragment>
              <Link to="/admin-panel" className="nav__button">
                Admin Panel
              </Link>
              <div className="nav__button" onClick={this.handleLogout}>
                Logout
              </div>
            </React.Fragment>
          ) : null}
          {this.state.loggedIn && this.state.authType !== 'admin' ? (
            <React.Fragment>
              <Link to="/me" className="nav__button">
                Profile
              </Link>
              <Link to="/dashboard" className="nav__button">
                Dashboard
              </Link>
              <div className="nav__button">
                Notifications
                <div className="nav__button__contents">
                  <ul>
                    <li>He liked your post</li>
                    <li>He is awesome</li>
                  </ul>
                </div>
              </div>
              <div className="nav__button" onClick={this.handleLogout}>
                Logout
              </div>
            </React.Fragment>
          ) : null}
          {!this.state.loggedIn ? (
            <React.Fragment>
              <Link to="/login?type=student" className="nav__button">
                Login
              </Link>
              <Link to="/signup?type=student" className="nav__button">
                Sign Up
              </Link>
            </React.Fragment>
          ) : null}
        </div>
      </nav>
    );
  }
}

export default passAuthProps(withRouter(NavBar));
