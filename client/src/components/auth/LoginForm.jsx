import React, { Component } from 'react';
// import axios from 'axios';

// Components
import Input from '../utility/Input';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  componentDidMount() {
    // axios.get('/hi').then(res => {
    //   console.log(res.data);
    // });
  }

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <h1 className="page-title mb-6">Login</h1>
        <Input
          type="email"
          placeholder="Email"
          name="email"
          value={this.state.email}
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

export default LoginForm;
