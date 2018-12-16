import React from 'react';
import { Link } from 'react-router-dom';

const GettingStarted = props => {
  return (
    <div className="getting-started">
      <div className="getting-started__left">
        {props.loggedIn ? (
          props.auth.type === 'admin' ? (
            <React.Fragment>
              <p className="title">Go To Admin Panel</p>
              <Link to="/adminpanel" className="btn btn--primary btn--block">
                Click Here
              </Link>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <p className="title">Go To Dashboard</p>
              <Link to="/dashboard" className="btn btn--primary btn--block">
                Click Here
              </Link>
            </React.Fragment>
          )
        ) : (
          <React.Fragment>
            <p className="title">Students Start Here</p>
            <div className="btn-collection">
              <Link
                to="/signup?type=student"
                className="btn btn--primary btn--block"
              >
                SignUp
              </Link>
              <Link
                to="/login?type=student"
                className="btn btn--primary btn--block"
              >
                Log In
              </Link>
            </div>
          </React.Fragment>
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
            onClick={props.handleLogout}
            className="btn btn--secondary btn--block"
          >
            Log Out
          </a>
        ) : (
          <div className="btn-collection">
            <Link
              to="/signup?type=teacher"
              className="btn btn--secondary btn--block"
            >
              SignUp
            </Link>
            <Link
              to="/login?type=teacher"
              className="btn btn--secondary btn--block"
            >
              Log In
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default GettingStarted;
