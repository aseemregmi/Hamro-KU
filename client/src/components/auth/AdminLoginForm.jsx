import React, { Component } from 'react';
// import axios from 'axios';

// Components
import Input from '../utility/Input';

class AdminLoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <h1 className="page-title mb-6">Admin Login</h1>
        <Input
          placeholder="Username"
          name="username"
          value={this.state.username}
          handleChange={this.handleChange}
        />
        <Input
          placeholder="Password"
          type="password"
          name="password"
          value={this.state.password}
          handleChange={this.handleChange}
        />
        <Input type="submit" value="Submit" />
      </form>
    );
  }
}

export default AdminLoginForm;
