import React from 'react';
import LoginForm from './../auth/LoginForm';
import { Link } from 'react-router-dom';

const Login = props => {
  return (
    <div className="login-page">
      <LoginForm />
      <Link to="/signup" className="btn btn--block">
        Don't Have an account ? Sign Up Here
      </Link>
    </div>
  );
};

export default Login;
