import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: true
    };
  }
  handleClick = e => {
    if (this.state.loggedIn) {
      e.preventDefault();
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
          {this.state.loggedIn ? (
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
          ) : (
            <Link to="/login" className="nav__button">
              Login
            </Link>
          )}
        </div>
      </nav>
    );
  }
}

export default NavBar;
