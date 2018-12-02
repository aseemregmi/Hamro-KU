import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  state = {
    loggedIn: true
  };

  handleLogout = e => {
    e.preventDefault();
  };

  render() {
    return (
      <div className="home">
        <div className="welcome-block">
          <div className="title-container">
            <p className="heading2">Welcome to</p>
            <p className="heading1">Kathmandu University</p>
          </div>

          <Link to="/explore" className="btn btn--large btn--primary">
            Explore Now
          </Link>
        </div>
        <div className="getting-started">
          <div className="getting-started__left">
            <p className="title">
              {this.state.loggedIn ? 'Go to Dashboard' : 'Students Start Here'}
            </p>

            {this.state.loggedIn ? (
              <Link to="/dashboard" className="btn btn--primary btn--block">
                Click Here
              </Link>
            ) : (
              <div className="btn-collection">
                <Link to="/signup" className="btn btn--primary btn--block">
                  SignUp
                </Link>
                <Link to="/login" className="btn btn--primary btn--block">
                  Log In
                </Link>
              </div>
            )}
          </div>

          <div className="getting-started__right">
            <p className="title">
              {this.state.loggedIn
                ? 'Want to Login From Another Account ?'
                : 'Teachers Start Here'}
            </p>
            {this.state.loggedIn ? (
              <a
                href="#"
                onClick={this.handleLogout}
                className="btn btn--secondary"
              >
                Log Out
              </a>
            ) : (
              <div className="btn-collection">
                <Link to="/signup" className="btn btn--secondary btn--block">
                  SignUp
                </Link>
                <Link to="/login" className="btn btn--secondary btn--block">
                  Log In
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
