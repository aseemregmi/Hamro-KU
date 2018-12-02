import React from 'react';
import { Link } from 'react-router-dom';

const GettingStarted = props => {
  function handleLogout(e) {
    e.preventDefault();
  }
  return (
    <div className="getting-started">
      <div className="getting-started__left">
        <p className="title">
          {props.loggedIn ? 'Go to Dashboard' : 'Students Start Here'}
        </p>

        {props.loggedIn ? (
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
          {props.loggedIn
            ? 'Want to Login From Another Account ?'
            : 'Teachers Start Here'}
        </p>
        {props.loggedIn ? (
          <a
            href="/"
            onClick={handleLogout}
            className="btn btn--secondary btn--block"
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
  );
};

export default GettingStarted;
