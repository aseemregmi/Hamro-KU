import React, { Component } from 'react';
import axios from 'axios';

// Components
import Input from '../utility/Input';

class AdminLoginForm extends Component {
  state = {
    username: '',
    password: '',
    error: null,
    success: null
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e, dispatch) => {
    e.preventDefault();
    const { username, password } = this.state;

    try {
      const auth = await axios.post('/api/admins/login', {
        username,
        password
      });
      dispatch({ type: 'LOGIN', payload: auth.data });
      this.setState({
        success:
          'You are successfully logged in. You are being redirected to Admin Panel'
      });
      setTimeout(() => {
        this.setState({ success: null });
        this.props.history.push('/adminpanel/students');
      }, 1500);
    } catch (err) {
      this.setState({ error: err.response.data });
      setTimeout(() => {
        this.setState({ error: null });
      }, 5000);
    }
  };

  render() {
    return (
      <form
        className="form"
        onSubmit={e => {
          this.handleSubmit(e, this.props.dispatch);
        }}
      >
        <h1 className="page-title mb-6">Admin Login</h1>
        {this.state.error ? (
          <p className="error-msg">{JSON.stringify(this.state.error)}</p>
        ) : null}
        {this.state.success ? (
          <p className="success-msg">{JSON.stringify(this.state.success)}</p>
        ) : null}
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
