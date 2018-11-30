import React, { Component } from 'react';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      username: ''
    };
  }
  render() {
    return (
      <nav className="nav">
        <span className="nav__title ml-6">Hamro-KU</span>
        <div style={{ flex: 1 }} />
        <div className="nav__buttons">
          <a href="/" className="nav__button">
            Profile
          </a>
          <a href="/" className="nav__button">
            {this.state.loggedIn ? 'Logout' : 'Login'}
          </a>
        </div>
      </nav>
    );
  }
}

export default NavBar;
