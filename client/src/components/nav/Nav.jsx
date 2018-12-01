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
        <Link to="/" className="nav__title ml-6">
          Hamro-KU
        </Link>
        <div style={{ flex: 1 }} />
        <div className="nav__buttons">
          <Link to="/me" className="nav__button">
            Profile
          </Link>

          {this.state.loggedIn ? (
            <React.Fragment>
              <Link to="/dashboard" className="nav__button">
                Dashboard
              </Link>
              <div className="nav__button">Notifications</div>
            </React.Fragment>
          ) : null}

          <Link to="/login" className="nav__button" onClick={this.handleClick}>
            {this.state.loggedIn ? 'Logout' : 'Login'}
          </Link>
        </div>
      </nav>
    );
  }
}

export default NavBar;
