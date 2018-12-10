import React, { Component } from 'react';
import axios from 'axios';

// Components
import Input from '../utility/Input';

class TeacherLoginForm extends Component {
  state = {
    email: '',
    password: '',
    error: null,
    success: null
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e, dispatch) => {
    const { email, password } = this.state;
    e.preventDefault();
    try {
      const auth = await axios.post('/api/teachers/login', { email, password });
      console.log(auth.data);
      dispatch({ type: 'LOGIN', payload: auth.data });
      this.setState({
        success:
          'You are successfully logged in. You are being redirected to dashboard...'
      });
      setTimeout(() => {
        this.props.history.push('/dashboard');
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
        <h1 className="page-title mb-6">Teacher Login</h1>
        {this.state.error ? (
          <p className="error-msg">{JSON.stringify(this.state.error)}</p>
        ) : null}
        {this.state.success ? (
          <p className="success-msg">{JSON.stringify(this.state.success)}</p>
        ) : null}
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

export default TeacherLoginForm;
